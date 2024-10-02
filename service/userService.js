const User = require('../models/User');

// Function to find a user by their username
const findUserByUsername = async (username) => {
    return await User.findOne({ username });
};

const findUserByEmail  =  async (email) =>
{
    return await User.findOne({email});
}

// Function to create a new user
const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Function to update user data
const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Function to delete a user by ID
const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

module.exports = {
    findUserByUsername,
    findUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
