const teamController = {
    createTeam: (req, res) => {
        res.send("Team: Create a new team");
    },
    joinTeam: (req, res) => {
        res.send("Team: Join an existing team");
    }
};

module.exports = teamController;
