var mongoose = require('mongoose');
const {Article}=require("./articles.js");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    anonymous:Boolean,
    articlesList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'article'
    }]
    
})

const User= mongoose.model("User", UserSchema);
module.exports={User};