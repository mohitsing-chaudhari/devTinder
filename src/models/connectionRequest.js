const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{VALUE} is incorrect status type`
        }
    }
},{timeStamp : true});

ConnectionRequestmodel = mongoose.model("connectionRequest",connectionRequestSchema);
module.exports = ConnectionRequestmodel;