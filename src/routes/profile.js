const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

// get user profile
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.send("Error "+err.message);
    }
});

module.exports = profileRouter;