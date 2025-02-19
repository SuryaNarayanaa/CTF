const {validationResult, body,param} = require('express-validator')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const Question = require('../models/CtfQuestion.js')
const mongoose = require('mongoose')

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
        if(user)  throw new ApiError(401,"Team_name already exists") 
    }),
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


module.exports = {validateSignUp,validateLogin,validateCreateQuestion,validateQuestionId,validateUserID}
