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
            unique: true// email must be unique
        },
        lowercase : true,
        trim : true
    },
    password :{
        type : String,
        required : true, //ensures password must be required while signing up
        minLength : 8, // If the type is string use minLength and if the type is number use min
        trim : true // if user entered spaces in email then this will remove it
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
    }
},{
    timestamps : true,
});

module.exports = mongoose.model("User",userSchema);