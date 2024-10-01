const homeController = {
    home: (req, res) => {
        res.status(200).json({
            message: 'Welcome to the API! Here you can explore CTF challenges, manage teams, and more.'
        });
    }
};

module.exports = homeController;
