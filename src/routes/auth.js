const express = require("express");
const authRouter = express.Router();
const {validateUser}=require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");
const jwt = require('jsonwebtoken');

authRouter.post("/signup",async(req,res)=>{
    try{
        validateUser(req);
        const {firstName,lastName,email,password}=req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            email,
            password:passwordHash
        });
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Unable to save user "+err.message);
    }
});

//login api
authRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!validator.isEmail(email)){
            throw new Error("Invalid Email");
        }
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            throw new Error("Incorrect Password");
        }else{
            // creating a jwt token
            const token = await jwt.sign({_id:user._id},"DevTinder",{expiresIn:"7d"});
            console.log(token);
            // adding cookie to token
            res.cookie("token",token);
            res.send("Login Successful");
        }
    }catch(err){
        res.send("Error "+err.message);
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.send("Logout Successful!!!")
})

module.exports = authRouter;