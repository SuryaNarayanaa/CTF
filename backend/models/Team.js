const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    leaderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    funFact: {
        type: String,
        trim: true
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
