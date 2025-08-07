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
        await mongoose.connect('mongodb+srv://thangarajsurya001:Ntsn03062005@ctf-cluster.drm7f.mongodb.net/CTF_DB?retryWrites=true&w=majority&appName=CTF-Cluster')
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


