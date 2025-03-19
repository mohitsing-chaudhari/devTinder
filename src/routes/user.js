const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const { set } = require("mongoose");
const User = require("../models/user");

//get all the logged in user request
userRouter.get("/user/request/received",userAuth,async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const requests = await connectionRequest.find({
            toUserId:loggedInUserId,
            status:"interested"
        }).populate("fromUserId","firstName lastName skills about gender age photourl");
        if(!requests){
            throw new Error("No Connection Requests Found");
        }
        res.json({
            message:"Data Fetched Successfully",
            data:requests
        });
    }catch(err){
        res.send("Error:-"+err.message);
    }
});

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;

        const connections = await connectionRequest.find({
            $or :[
                {toUserId:loggedInUserId},
                {fromUserId:loggedInUserId}
            ],
            status:"accepted"
        }).populate("toUserId","firstName lastName gender age skills about photourl")
        .populate("fromUserId", "firstName lastName gender age skills about photourl");

        if(!connections){
            throw new Error("No connection found");
        }
        const data = connections.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUserId._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({
            data
        });
    }catch(err){
        throw new Error("Error:-"+err.message);
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page-1)*limit;
        if(limit>50){
            limit = 50;
        }

        // checks all the logged in user connections or he sends or receives request 
        // we need to hide that users on feed
        const connectionRequests = await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUserId},
                {toUserId:loggedInUserId}
            ]
        }).select("fromUserId toUserId");
       
        const hiddenUsers = new Set();
        connectionRequests.forEach((req)=>{
            hiddenUsers.add(req.fromUserId.toString());
            hiddenUsers.add(req.toUserId.toString());
        });
    
        const users = await User.find({
            $and:[
                {_id:{$nin:Array.from(hiddenUsers)}},
                {_id:{$ne:loggedInUserId}}
            ]
        }).select("firstName lastName skills about gender age photourl").skip(skip).limit(limit);
    
        res.send(users);
    }catch(err){
        res.send("Error:-"+err.message);
    }
});

module.exports = userRouter;