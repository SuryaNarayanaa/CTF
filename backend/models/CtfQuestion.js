const mongoose = require('mongoose');
const { Schema } = mongoose;

const ctfQuestionSchema = new Schema({
    category :
    {type : String,
        required : true,
    },
    title: {
        type: String,
        required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CtfQuestion = mongoose.model('CtfQuestion', ctfQuestionSchema);

module.exports = CtfQuestion;
