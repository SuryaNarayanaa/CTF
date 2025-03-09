const asyncHandler = require('../utils/asyncHandler');
const CtfQuestion = require('../models/CtfQuestion');
const Category = require('../models/category');
const ApiError = require('../utils/ApiError');
const CtfSubmission = require('../models/CtfSubmission');
const ApiResponse = require('../utils/ApiResponse');
const User = require("../models/User");
const Question = require('../models/CtfQuestion.js')
const { updateLeaderboard, getRankForUser } = require('../utils/leaderboardstore');

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    const { id: user_id } = req.session.user;
    const user = await User.findById(user_id);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }
    res.status(200).json(new ApiResponse(200, { categories:categories, solved:user.solved }, "Categories fetched"));
});

const submitAnswer = asyncHandler(async (req, res) => {
    const { question_id, answer } = req.body;
    const { id: user_id } = req.session.user;
    const question =  await Question.findById(question_id)

    if (!question) {
        throw new ApiError(404, 'Question not found');
    }

    let submission = await CtfSubmission.findOne({ user_id, question: question_id });
    const isCorrect = question.answer === answer; // Assuming correctAnswer field exists

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
            user.score += question.points;
            user.flag += 1;
            user.solved = {...user.solved,[`${question_id}`]:true}
            await user.save();

            await updateLeaderboard(user_id.toString(), user.score,user.team_name, user.flag);
        }
    }else{
        const user = await User.findById(user_id);
        if (user) {
            user.score -= 10;
            await user.save();
            await updateLeaderboard(user_id.toString(), user.score,user.team_name, user.flag);
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
    const { id:category_id } = req.params;
    const questions = await CtfQuestion.find({ category: category_id });
    res.status(200).json(new ApiResponse(200, questions, "Questions fetched"));
});

// Returns the user's current rank and score
const getRank = asyncHandler(async (req, res) => {
    const { id: user_id } = req.session.user;
    const user = await User.findById(user_id);
    const score = user ? user.score : 0;
    const entry = await getRankForUser(user_id.toString());
    console.log(entry);
    if(!entry) throw new ApiError(404, 'User not found in leaderboard');
    else res.status(200).json(new ApiResponse(200, { rank:entry.rank, flag:entry.flag }, "User rank and score fetched"));
});


const getCurrentUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.session.user.id);
    res.status(200).json(new ApiResponse(200,user,"User returned sucessfully"));
})

module.exports = { getCategories, submitAnswer, getCurrentScore, getQuestionbyCategory, getRank,getCurrentUser };