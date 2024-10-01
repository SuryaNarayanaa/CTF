const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    leader: {
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
    }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
