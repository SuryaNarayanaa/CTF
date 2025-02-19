const asyncHandler = require('../utils/asyncHandler')
const CtfQuestion = require('../models/CtfQuestion')
const Category = require('../models/category')
const ApiError = require('../utils/ApiError')
const CtfSubmission = require('../models/CtfSubmission')
const ApiResponse = require('../utils/ApiResponse')
const User=require("../models/User")


const getCategories=asyncHandler(async(req,res)=>{
    const categories = await Category.find()
    res.status(200).json(new ApiResponse(200,categories,"Categories fetched"))

})

const submitAnswer = asyncHandler(async (req, res) => {
    const { question_id, answer } = req.body;
    const {id:user_id} = req.session.user;

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
            user.score += question.score - submission.wrong*10; 
            user.flag += 1;
            await user.save();
        }
    }

    res.status(200).json(new ApiResponse(200, submission, "Answer submitted successfully"));
});



const getCurrentScore=asyncHandler(async(req,res)=>{
    const {id:user_id} = req.session.user;
    const {score:score,flag:flag}=await User.findById(user_id);
    res.status(200).json(new ApiResponse(200, {score:score,flag:flag},"The current score of the user is recieved"))
})

const getQuestionbyCategory=asyncHandler(async(req,res)=>{
    const {category} = req.body;
    const {_id:category_id}=await Category.findOne({category_name:category});   
    const questions = await CtfQuestion.find({category:category_id});   
    res.status(200).json(new ApiResponse(200,questions,"questions fetched"))
})

const getRank={
    
}

module.exports = {getCategories,submitAnswer,getCurrentScore,getQuestionbyCategory,getRank}