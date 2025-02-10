const express = require("express");

const app = express();

const {connectDB} = require("./config/database");

const User = require("./models/user");

app.post("/signup",async(req,res)=>{
    
    const user = new User({
        firstName : "Vaishnavi",
        lastName : "Chaudhari",
        email : "vaish@chaudhari.com",
        password : "vaish@123",
        otp : "1234"
    });

    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Unable to save user");
    }
});


connectDB().then(()=>{
    console.log("Database successfully connected");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777");
    });
}).catch(()=>{
    console.error("Database not connected");
});

