const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditData} = require("../utils/validate");
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
        console.log(user);
        Object.keys(req.body).forEach((key)=>{user[key]=req.body[key]});
        console.log(user)
        user.save();
        res.send(`${user.firstName} your profile is updated successfully`);
    }catch(err){
        res.send("Error:- "+err.message);
    }
});

module.exports = profileRouter;