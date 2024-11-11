const Team = require("../models/Team")
const User = require("../models/User");
const { findTeamById } = require("./userService");
const teamService = {
    createTeam: async (teamData) => {
        const newTeam = new Team(teamData);
        return await newTeam.save();
    },
    joinTeam: async (teamId, userId) => {
        const team = await Team.findById(teamId);
        const user = await User.findById(userId);
        team.members.push(user);
        return await team.save();
    },

    findTeamById:async(id)=>{
        return await Team.findOne({id});
    },
    findTeamByName :async (name) => 
        {
            return await Team.findOne({name});
        },
    getAllTeams: async () => { 
        return await Team.find();
    }
};

module.exports = teamService;


