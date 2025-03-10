const mongoose = require('mongoose');
const { Schema } = mongoose;

const ctfSubmissionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    wrong:{
        type:Number,
        default:0
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.CtfSubmission || mongoose.model('Submission', ctfSubmissionSchema);
