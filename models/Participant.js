const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    ctfSubmissions: [{
        type: Schema.Types.ObjectId,
        ref: 'CtfSubmission'
    }],
    score: {
        type: Number,
        default: 0
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
