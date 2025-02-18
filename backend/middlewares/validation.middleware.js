const {validationResult, body} = require('express-validator')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')

const withValidationResult = (validationValue) =>{
    return [
        validationValue,
        (req,res,next)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map(err=>err.msg)
                throw new ApiError(err.statusCode||401,errorMessages[0]);
            }
            next()
        }
    ]
}


const validateSignUp = withValidationResult([
    body('username').notEmpty().withMessage("username is required"),
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

module.exports = {validateSignUp,validateLogin}
