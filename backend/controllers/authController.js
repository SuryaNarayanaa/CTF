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
            
            logout: (req, res) => {
              try {
                if (!req.session) {
                  return res.status(400).json({ error: 'No active session' });
                }
                req.session.destroy(err => {
                  if (err) {
                    console.error('Error during logout:', err); // Log the error for debugging
                    return res.status(500).json({ error: 'Failed to logout' });
                  }
                  res.status(200).json({ message: 'User logged out' });
                });
              } catch (err) {
                console.error('Error during logout:', err); // Log the error for debugging
                res.status(500).json({ error: 'Internal Server Error' });
              }
            },
            funthing: async (req, res) => {
              try {
                if (!req.session) {
                  return res.status(400).json({ error: 'No active session' });
                }
                const fun = req.body.fun;
                const teamname = req.body.team;
                const team = await userService.findTeamByName(teamname);
                if (!team) {
                  return res.status(404).json({ error: 'Team not found' });
                }
                team.funFact = fun;
                await userService.updateTeam(team._id, { funFact: fun });
                res.status(200).json({ message: 'Fun thing updated', team });
              } catch (err) {
                console.error('Error during funthing update:', err); // Log the error for debugging
                res.status(500).json({ error: 'Internal Server Error' });
              }
            },
            getTeam: async (req, res) => {
              try {
                if (!req.session) {
                  return res.status(400).json({ error: 'No active session' });
                }
                const teamname = req.body.team;
                const team = await userService.findTeamByName(teamname);
                if (!team) {
                  return res.status(404).json({ error: 'Team not found' });
                }
                res.status(200).json({ team });
              } catch (err) {
                console.error('Error during team retrieval:', err); // Log the error for debugging
                res.status(500).json({ error: 'Internal Server Error' });
              }

          }
}

module.exports = authController;