const teamService = require("../service/teamService");
const userService = require("../service/userService");
const Team= require("../models/Team")
const teamController = {
    createTeam: async (req, res) => {
        const { name, leader } = req.body;
        if (!name || !leader) {
            return res.status(400).send("Both name and leader are required");
        }
        try {
            const leaderObj = await userService.findUserByUsername(leader);
            if (!leaderObj) {
                return res.status(404).send("Leader not found");
            }
            const leaderId = leaderObj._id;
            const team = await teamService.createTeam({name, leaderId, members: [leaderId]});
            res.status(201).send(team);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    joinTeam: (req, res) => {
        const { teamName, userName } = req.body;
        if (!teamName || !userName) {
            return res.status(400).send("Both teamName and userName are required");
        }
        teamService.findTeamByName(teamName)
            .then(async (team) => {
                if (!team) {
                    return res.status(404).send("Team not found");
                }
                const user = await userService.findUserByUsername(userName);
                if (!user) {
                    return res.status(404).send("User not found");
                }

                const teamId = team._id;
                const userId = user._id;
                team =await  teamService.joinTeam(teamId, userId);
                res.status(200).send(team);
            })
            .catch((err) => {
                res.status(500).send(err.message);})
    },
    getallTeams: async (req, res) => {
        try {
            const teams = await teamService.getAllTeams();
            res.status(200).send(teams);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
update: async (req, res) => {
        try {
            const { name, category } = req.body;
            
            const team = await Team.findOne({ name });
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
                if (!team.unlocked.includes(category)) {
                    team.unlocked.push(category);
                }
            await team.save();
            res.status(200).json({ message: "Updated successfully", unlocked: team.unlocked });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports = teamController;
