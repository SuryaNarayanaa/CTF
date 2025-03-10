const mongoose = require('mongoose')
require('dotenv').config()
const User = require('../models/User.js')


const adminData = {
    team_name:"admin",
    email:"admin@gmail.com",
    password:"admin123",
    role:"admin"
}

const createAdmin = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const deletedUser = await User.findOneAndDelete({role:'admin'});
        console.log(deletedUser);
        const user = await User.create(adminData)
        console.log(user);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

createAdmin()


