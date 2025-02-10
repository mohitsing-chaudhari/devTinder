const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email :{
        type : String
    },
    password :{
        type : String
    },
    mobNo : {
        type : Number
    },
    age : {
        type : Number
    },
    otp : {
        type : Number
    }
});

module.exports = mongoose.model("User",userSchema);