const asyncHandler = require('../utils/asyncHandler');
const CtfQuestion = require('../models/CtfQuestion');
const Category = require('../models/category');
const ApiError = require('../utils/ApiError');
const CtfSubmission = require('../models/CtfSubmission');
const ApiResponse = require('../utils/ApiResponse');
const User = require("../models/User");

// Initialize Redis client
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().catch(console.error);

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(new ApiResponse(200, categories, "Categories fetched"));
});

const submitAnswer = asyncHandler(async (req, res) => {
    const { question_id, answer } = req.body;
    const { id: user_id } = req.session.user;

    const question = await CtfQuestion.findById(question_id);
    if (!question) {
        throw new ApiError(404, 'Question not found');
    }

    let submission = await CtfSubmission.findOne({ user_id, question: question_id });
    const isCorrect = question.correctAnswer === answer; // Assuming correctAnswer field exists

    if (submission) {
        if (!isCorrect) {
            submission.wrong += 1;
        }
        submission.isCorrect = isCorrect;
        await submission.save();
    } else {
        submission = await CtfSubmission.create({
            user_id,
            question: question_id,
            isCorrect,
            wrong: isCorrect ? 0 : 1
        });
    }

    if (isCorrect) {
        const user = await User.findById(user_id);
        if (user) {
            user.score += question.score - submission.wrong * 10;
            user.flag += 1;
            await user.save();

            // Update user's score in Redis sorted set
            // Redis sorted set key 'leaderboard' where value is user_id and score is user.score
            await redisClient.zAdd('leaderboard', [{ score: user.score, value: user_id.toString() }]);

            // Retrieve the updated rank (highest scores have rank 0 in Redis so add 1 for a friendly ranking)
            const rank = await redisClient.zRevRank('leaderboard', user_id.toString());
            const score = await redisClient.zScore('leaderboard', user_id.toString());
            const message = JSON.stringify({ userId: user_id, rank: rank !== null ? rank + 1 : 0, score });
            await redisClient.publish('rank_updates', message);
        }
    }

    res.status(200).json(new ApiResponse(200, submission, "Answer submitted successfully"));
});

const getCurrentScore = asyncHandler(async (req, res) => {
    const { id: user_id } = req.session.user;
    const { score, flag } = await User.findById(user_id);
    res.status(200).json(new ApiResponse(200, { score, flag }, "The current score of the user is received"));
});

const getQuestionbyCategory = asyncHandler(async (req, res) => {
    const { category } = req.body;
    const { _id: category_id } = await Category.findOne({ category_name: category });
    const questions = await CtfQuestion.find({ category: category_id });
    res.status(200).json(new ApiResponse(200, questions, "Questions fetched"));
});

const getRank = asyncHandler(async (req, res) => {
    const { id: user_id } = req.session.user;
    const rank = await redisClient.zRevRank('leaderboard', user_id.toString());
    const score = await redisClient.zScore('leaderboard', user_id.toString());
    res.status(200).json(
        new ApiResponse(200, { rank: rank !== null ? rank + 1 : 0, score }, "User rank and score fetched")
    );
});

module.exports = { getCategories, submitAnswer, getCurrentScore, getQuestionbyCategory, getRank };