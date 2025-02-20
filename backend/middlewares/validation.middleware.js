const {validationResult, body,param} = require('express-validator')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const Question = require('../models/CtfQuestion.js')
const mongoose = require('mongoose')
const asynchandler = require('../utils/asyncHandler.js')

const withValidationResult = (validationValue) =>{
    return [
        validationValue,
        (req,res,next)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((error)=>{
                    if(error instanceof ApiError) return error.message
                    return error.msg
                })
                throw new ApiError(401,errorMessages[0]);
            }
            next()
        }
    ]
}


const validateSignUp = withValidationResult([
    body('team_name').notEmpty().withMessage("username is required").
    custom(async(value)=>{
        const user = await User.findOne({team_name:value})
        if(user)  throw new ApiError(401,"Team_name already exists");
        if(!user.loggedCount == 0) throw new ApiError(401,"team_member has already logged in.")
    }).isLength({min:3}).withMessage("team_name should be three characeters long"),
    body('email').notEmpty().withMessage('email is required').
    isEmail().withMessage("Provide a valid email").
    custom(async(email)=>{
        const ExistingUser = await User.findOne({email})
        if(ExistingUser){
            throw new ApiError(400,"User already exist");
        }
    }),
    body('password').notEmpty().withMessage("password is required").
    isLength({min:5}).withMessage("paasword must be atleast 5 characters long")
])

const validateLogin = withValidationResult([
    body('email').notEmpty().withMessage('email is required').
    isEmail().withMessage("Provide a valid email"),
    body('password').notEmpty().withMessage("password is required").
    isLength({min:5}).withMessage("paasword must be atleast 5 characters long")
])


const validateCreateQuestion = withValidationResult([
    body('category').notEmpty().withMessage('category_name is required')
])


const validateQuestionId = withValidationResult([
    param('id').custom(async(value)=>{
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if(!isValid) throw new ApiError(401,"Invalid id param")
        const question = await Question.findById(value)
        if(!question) throw new ApiError(401,`Question with ${value} doesn't exist`)
    })
])

const validateUserID = withValidationResult([
    param('id').custom(async(value)=>{
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if(!isValid) throw new ApiError(401,"Invalid id param")
        const user = await User.findById(value);
        if(!user) throw new ApiError(401,`User with ${value} doesn't exist`)
    })
])

const validateSubmitAnswer = withValidationResult([
    body('question_id').notEmpty().withMessage("question_id should not be empty").
    custom(async(value)=>{
        const question = await Question.findById(question_id);
        if (!question) {
            throw new ApiError(404, 'Question not found');
        } 
    }),
    body('answer').notEmpty().withMessage("answer field should not be empty")
])






module.exports = {validateSignUp,validateLogin,validateCreateQuestion,validateQuestionId,validateUserID,validateSubmitAnswer}
