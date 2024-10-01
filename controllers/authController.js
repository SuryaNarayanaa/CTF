const authController = {
    signup: (req, res) => {
        res.send("Auth: User signup");
    },
    login: (req, res) => {
        res.send("Auth: User login");
    },
    adminLogin: (req, res) => {
        res.send("Auth: Admin login");
    },
    logout: (req, res) => {
        res.send("Auth: User logout");
    }
};

module.exports = authController;
