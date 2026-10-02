const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true, "Username must be unique"],
        required:[true, "Username is required"],
        minlength:[3, "Username cannot be smaller than 3 characters"],
        maxlength:[30, "Username cannot be greater than 30 characters"]
    },
    email:{
        type:String,
        unique:[true , "This email is already exists."],
        required:[true , "Email is required"],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[8, "Password must be 8 characters long"]
    }

},{
    timestamps:true,
});


const userModel = mongoose.model('user' , userSchema);
module.exports = userModel;