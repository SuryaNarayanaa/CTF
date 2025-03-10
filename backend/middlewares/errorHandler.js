const mongoose = require('mongoose')
const ApiError = require('../utils/ApiError.js')

const errorHandler = (err,req,res,next) =>{
    let error = err;
    if(!(err instanceof ApiError)){
        console.log(error);
        const statusCode = error instanceof mongoose.Error ? 400 : 500
        const message =  error.message ||  "Something went Wrong"
        error = new ApiError(statusCode,message)
    }
    const response = {...error}
    return res.status(error.statusCode).json(response);
}

module.exports = errorHandler