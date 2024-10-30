const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    ctfSubmissions: [{
        type: Schema.Types.ObjectId,
        ref: 'CtfSubmission'
    }],
    score: {
        type: Number,
        default: 0
    },
    flags : { type: Number,
    default: 0}
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;