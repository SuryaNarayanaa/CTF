const asyncHandler = require('../utils/asyncHandler')
const ApiResponse = require('../utils/ApiResponse')
const ApiError = require('../utils/ApiError')
const Question = require('../models/CtfQuestion')
const Category = require('../models/category')
const User = require('../models/User')


const getQuestions = asyncHandler(async(req,res)=>{
    const questions = await Question.find();
    res.status(200).json(new ApiResponse(200,questions,"Questions Fetched"))
})

const createQuestion = asyncHandler(async(req,res)=>{
    const {category} = req.body
    let newCategory = await Category.find({category_name:category})
    if(!newCategory) newCategory = await Category.create({category_name:category})
    
    const question = await Question.create({...req.body,category:newCategory._id})
    res.status(201).json(new ApiResponse(201,question,"Question Created"))
})

const updateQuestion = asyncHandler(async(req,res)=>{
    const {category} = req.body;
    let newCategory = await Category.find({category_name:category})
    if(!newCategory) newCategory = await Category.create({category_name:category})
    
    const question = await Question.findByIdAndUpdate(id,{
        ...req.body,category:newCategory._id
    },{new:true})

    res.status(200).json(new ApiResponse(200,question,"Question Updated"))

})

const deleteQuestion = asyncHandler(async(req,res)=>{
    const {id:questionID} = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(questionID)
    res.status(200).json(new ApiResponse(200,deletedQuestion,"Question Deleted"))
})

const fetchQuestionsByCategory = asyncHandler(async(req,res)=>{
    
})


const getUserById = asyncHandler(async(req,res)=>{
    const {id:UserID} = req.params;
    const user = await User.findById(UserID);
    res.status(200).json(new ApiResponse(200,user,"user found"))
})


const getDashboard = asyncHandler(async(req,res)=>{
    
})


module.exports = {getQuestions,createQuestion,updateQuestion,deleteQuestion,getDashboard,getUserById}