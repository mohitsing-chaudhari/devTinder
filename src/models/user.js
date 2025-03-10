const mongoose  = require("mongoose");
const validator = require("validator");

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
            unique: true// email must be unique
        },
        lowercase : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password :{
        type : String,
        required : true, //ensures password must be required while signing up
        minLength : 8, // If the type is string use minLength and if the type is number use min
        trim : true, // if user entered spaces in email then this will remove it
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Passwoed");
            }
        }
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
    gender : {
        type : String,
        validate : function(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender not valid"); 
            }
        }
    },
    skills : {
        type : [String],
    },
    photourl : {
        type : String,
        default : "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL");
            }
        }
    }
},{
    timestamps : true,
});

module.exports = mongoose.model("User",userSchema);