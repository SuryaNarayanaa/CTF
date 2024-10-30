const User = require('../models/User');

// Function to find a user by their username
const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (err) {
        console.error('Error finding user by username:', err);
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
    deleteUser
};