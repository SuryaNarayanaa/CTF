const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: [true,"team name is required"],
        trim: true,
    },
    team_members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    score:{
        type:Number,
        default:0
    },
    flag:{
        type:Number,
        default:0
    },
    submissions:[{
        type:Schema.Types.ObjectId,
        ref:'Submission'
    }]
},{timestamps:true});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
