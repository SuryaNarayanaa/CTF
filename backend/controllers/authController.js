const userService = require('../service/userService');
const bcrypt = require("bcrypt")
const saltRounds = 10;








const authController = {




    signup: async (req, res) => {
        try {
            const { username, email, password , role } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await userService.createUser({ username, email, password: hashedPassword ,role});
            res.status(201).json({ message: 'User created', user: newUser });
        } catch (err) {
            console.log(req.body);
            res.status(500).json({ error: err.message });
        }},




        login: async (req, res) => {
            try {
                const { email, password } = req.body;
                const user = await userService.findUserByEmail(email);
                if (!user) {
                    return res.status(401).json({ message: 'Authentication failed. User not found.' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                }
                res.status(200).json({ message: 'User authenticated', user });
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        },

            adminLogin: async (req, res) => {
                try {
                const { email, password } = req.body;
                const user = await userService.findUserByEmail(email);
                if (!user || user.role !== 'admin') {
                    return res.status(401).json({ message: 'Authentication failed. Admin not found.' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                }
                res.status(200).json({ message: 'Admin authenticated', user });
                } catch (err) {
                res.status(500).json({ error: err.message });
                }
            },
            //TODO Logic for logout
            logout: (req, res) => {
                // Assuming you are using sessions
                req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to logout' });
                }
                res.status(200).json({ message: 'User logged out' });
                });
        res.send("Auth: User logout");
    }
};

module.exports = authController;
