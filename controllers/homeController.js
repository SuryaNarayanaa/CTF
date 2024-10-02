const homeController = {

    home: (req, res) => {
        res.status(200).json({
            message: 'Welcome to the API! Here you can explore CTF challenges, manage teams, and more.'
        });
    },


    leaderboard: (req, res) => {
        res.status(200).json({
            message: 'Here are the current standings for the CTF!'
        });
    },
};

module.exports = homeController;
