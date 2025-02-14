const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        maxLength : 12,
    },
    lastName : {
        type : String,
        required : true,
        maxLength : 12,
    },
    email :{
        type : String,
        required : true,
        index: {
            unique: true
        },
        lowercase : true,
        trim : true
    },
    password :{
        type : String,
        required : true,
        minLength : 8, // If the type is string use minLength and if the type is number use min
        trim : true
    },
    mobNo : {
        type : Number,
        index: {
            unique: true
        },
        trim : true
    },
    age : {
        type : Number,
        min : 18 // ensures the user must be 18+
    },
    skills : {
        type : [String],
    }
},{
    timestamps : true,
});

module.exports = mongoose.model("User",userSchema);