const mongoose = require('mongoose');

const ctfQuestionSchema = new mongoose.Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    title: {
        type: String,
        required: [true,"Title is required"],
        trim:true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    links: {
        type: [String],
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
},{timestamps:true});

const CtfQuestion = mongoose.model('Question', ctfQuestionSchema);

module.exports = CtfQuestion;
