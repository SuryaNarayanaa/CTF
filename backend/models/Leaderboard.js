const mongoose = require('mongoose');

const LeaderboardItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    team_name: { type: String, required: true },
    score: { type: Number, default: 0 },
    flag: { type: Number, default: 0 },
    rank:{type:Number,default:0}
}, { _id: false });

const LeaderboardSchema = new mongoose.Schema({
    entries: {
        type: [LeaderboardItemSchema],
        default:[]
    }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);