const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    category_name : {
        type:String,
        required:[true,"category name is required"],
        unique:true
    },
    flag:{
        type:Number,
        default:0
    }
},{timestamps:true});

const CategoryModel = mongoose.model('Category',CategorySchema);
module.exports = CategoryModel;