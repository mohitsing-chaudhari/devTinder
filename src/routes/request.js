const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

// sending connection request
requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user = req.user;
    console.log("Connection Request Sent");
    res.send(user.firstName+ " send you connection request");
});

requestRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const status = req.params.status;
    
        const allowedStaus = ["interested","ignored"];
        if(!allowedStaus.includes(status)){
            throw new Error("invalid status");
        }

        if(fromUserId == toUserId){
            throw new Error("You cant send connection request to yourself");
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("No user found");
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existingRequest){
            throw new Error("Request already sent");
        }

        const connectionRequest = new ConnectionRequest({fromUserId,toUserId,status});
        const data = await connectionRequest.save();
        res.json({
            message:`${req.user.firstName} is interested in ${toUser.firstName} profile`,
            data
        });
    }catch(err){
        res.send("Error:-"+err.message);
    }

});
module.exports = requestRouter;