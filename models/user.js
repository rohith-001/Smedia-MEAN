const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/ux-unicorn/image/upload/v1604920916/defaultuser_muuwfh.png"
       },
    password: {
        type: String,
        required: true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})


module.exports = mongoose.model("User",userSchema);