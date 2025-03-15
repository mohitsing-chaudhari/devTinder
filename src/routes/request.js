const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");

// sending connection request
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user;
    console.log("Connection Request Sent");
    res.send(user.firstName+ " send you connection request");
});

module.exports = requestRouter;