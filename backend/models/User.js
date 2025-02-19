const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: [true,"username is required"],
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: [true,"email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true,"password is required"],
        select:false
    },
    score:{
        type:Number,
        default:0
    },
    flag:{
        type:Number,
        default:0
    },
    submissions:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Submission'
    }],
    loggedCount:{
        type:Number,
        default:0,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{timestamps:true,virtuals:true});


UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) { return next(); }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password,salt)
})

UserSchema.methods.toJSON  = function() {
    var object = this.toObject();
    delete object.password;
    delete object.refreshToken;
    return object;
}

UserSchema.methods.comparePassword = async function(candiatePassword){
    const isCorrect = await bcryptjs.compare(candiatePassword,this.password);
    return isCorrect;
}


const User = mongoose.model('User', UserSchema);

module.exports = User;

