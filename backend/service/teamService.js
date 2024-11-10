const Team = require("../models/Team")
const User = require("../models/User")
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


    findTeamByName :async (name) => 
        {
            return await Team.findOne({name});
        },
    getAllTeams: async () => { 
        return await Team.find();
    }
};

module.exports = teamService;


