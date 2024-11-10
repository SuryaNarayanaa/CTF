const User = require('../models/User');
const Team = require('../models/Team');

// Function to find a user by their username
const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (err) {
        console.error('Error finding user by username:', err);
        throw err;
    }
};

// Function to find a team by their name
const findTeamByName = async (name) => {
    try {
        return await Team.findOne({ name });
    } catch (err) {
        console.error('Error finding team by name:', err);
        throw err;
    }
};

// Function to find a team by their ID
const findTeamById = async (id) => {
    try {
        return await Team.findById(id);
    } catch (err) {
        console.error('Error finding team by ID:', err);
        throw err;
    }
};

// Function to create a new team
const createTeam = async (teamData) => {
    try {
        const newTeam = new Team(teamData);
        return await newTeam.save();
    } catch (err) {
        console.error('Error creating team:', err);
        throw err;
    }
};

// Function to update team data
const updateTeam = async (teamId, updateData) => {
    try {
        return await Team.findByIdAndUpdate(teamId, updateData, { new: true });
    } catch (err) {
        console.error('Error updating team:', err);
        throw err;
    }
};

// Function to delete a team by ID
const deleteTeam = async (teamId) => {
    try {
        return await Team.findByIdAndDelete(teamId);
    } catch (err) {
        console.error('Error deleting team:', err);
        throw err;
    }
};

// Function to find a user by their email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (err) {
        console.error('Error finding user by email:', err);
        throw err;
    }
};

// Function to create a new user
const createUser = async (userData) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

// Function to update user data
const updateUser = async (userId, updateData) => {
    try {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    } catch (err) {
        console.error('Error updating user:', err);
        throw err;
    }
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
    try {
        return await User.findByIdAndDelete(userId);
    } catch (err) {
        console.error('Error deleting user:', err);
        throw err;
    }
};

module.exports = {
    findUserByUsername,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    findTeamByName,
    findTeamById,
    createTeam,
    updateTeam,
    deleteTeam
};
