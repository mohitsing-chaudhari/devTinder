const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditData} = require("../utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
// get user profile
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.send("Error "+err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(req.body.email){
            throw new Error("Email cant updated")
        }
        if(req.body.password){
            throw new Error("Password cant updated");
        }
        const user = req.user;
        Object.keys(req.body).forEach((key)=>{user[key]=req.body[key]});
        await user.save();
        res.send(`${user.firstName} your profile is updated successfully`);
    }catch(err){
        res.send("Error:- "+err.message);
    }
});

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const {password,newPassword}=req.body;
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            throw new Error("Password not match");
        }
        if(!validator.isStrongPassword(newPassword)){
            throw new Error("Enter a strong Password");
        }
        const newPasswordHash = await bcrypt.hash(newPassword,10);
        user.password=newPasswordHash;
        await user.save();
        res.send("Password Changed Successfully");
    }catch(err){
        res.send("Error:-"+err.message);
    }

});

module.exports = profileRouter;