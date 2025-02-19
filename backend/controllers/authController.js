const asyncHandler = require('../utils/asyncHandler')
const User = require('../models/User')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')

const signup = asyncHandler(async(req,res)=>{
    const user = await User.create(req.body)
    res.status(201).json(new ApiResponse(201,user,"User created"))
})


const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials")
    }
    req.session.user = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }
    res.status(200).json(new ApiResponse(200, "Login successful", req.session.user))
})

const logout = asyncHandler(async(req, res) => {
    req.session.destroy(err => {
        if (err) {
            throw new ApiError(500, "Error logging out")
        }
        res.status(200).json(new ApiResponse(200, "Logged out successfully"))
    })
})

const getTeam = asyncHandler(async(req, res) => {
    if (!req.session.user) {
        throw new ApiError(401, "Unauthorized")
    }
    const team = await Team.findOne({ team_members: req.session.user.id })
        .populate('team_members')
        .populate('submissions')
    if (!team) {
        throw new ApiError(404, "Team not found")
    }
    res.status(200).json(new ApiResponse(200, "Team fetched successfully", team))
})

const adminLogin = asyncHandler(async(req, res) => {  
    const { email, password } = req.body
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials")
    }
    if (user.role !== 'admin') {
        throw new ApiError(403, "Unauthorized")
    }
    req.session.user = {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
    }
    res.status(200).json(new ApiResponse(200, "Login successful", req.session.user))
})

module.exports = {signup,login,logout,getTeam,adminLogin}