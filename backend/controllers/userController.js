const asyncHandler = require('../utils/asyncHandler');
const CtfQuestion = require('../models/CtfQuestion');
const Category = require('../models/category');
const ApiError = require('../utils/ApiError');
const CtfSubmission = require('../models/CtfSubmission');
const ApiResponse = require('../utils/ApiResponse');
const User = require("../models/User");
const { updateLeaderboard, getRankForUser } = require('../utils/leaderboardStore');

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(new ApiResponse(200, categories, "Categories fetched"));
});

const submitAnswer = asyncHandler(async (req, res) => {
    const { question_id, answer } = req.body;
    const { id: user_id } = req.session.user;

    // Retrieve the question details
    const question = await CtfQuestion.findById(question_id);
    if (!question) {
        throw new ApiError(404, 'Question not found');
    }

    // Check if the submission already exists
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
            // Update user's score and flag
            user.score += question.score - submission.wrong * 10;
            user.flag += 1;
            await user.save();

            // Update the shared leaderboard (in-memory sorted array)
            updateLeaderboard(user_id.toString(), user.score);
            // Optionally, broadcast the updated leaderboard via WebSocket here.
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

// Returns the user's current rank and score
const getRank = asyncHandler(async (req, res) => {
    const { id: user_id } = req.session.user;
    const user = await User.findById(user_id);
    const score = user ? user.score : 0;
    const rank = getRankForUser(user_id.toString());
    res.status(200).json(new ApiResponse(200, { rank, score }, "User rank and score fetched"));
});

module.exports = { getCategories, submitAnswer, getCurrentScore, getQuestionbyCategory, getRank };