const mongoose = require('mongoose');
const { Schema } = mongoose;

const ctfSubmissionSchema = new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'CtfQuestion',
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.CtfSubmission || mongoose.model('CtfSubmission', ctfSubmissionSchema);
