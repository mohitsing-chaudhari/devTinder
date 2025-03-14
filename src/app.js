const express = require("express");

const app = express();

const {connectDB} = require("./config/database");

const User = require("./models/user");

const {validateUser}=require("./utils/validate");

const bcrypt = require("bcrypt");

const validator = require("validator")
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.json());// it converts all data into json 
app.use(cookieParser());

//sign up API
app.post("/signup",async(req,res)=>{
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
    

//get one user with specific email
app.get("/user",async(req,res)=>{
    try{
        const userEmail = req.body.email;
        const user = await User.find({email : userEmail});

        if(!user){
            res.send("User not found");
        }else{
            res.send(user);
        }
    }catch(err){
        console.log(err.message);
        res.send("Something went wrong");
    }
});


// feed api will give you all users
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.send("Something went wrong");
    }
});


// deleting a user
app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const deletedUser = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch(err){
        res.send("Something went wrong");
    }
});


//updating user data
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const updateAllowed = ["firstName","lastName","password","gender","skills"];

        const isUpdateAllowed = Object.keys(data).every((k) => updateAllowed.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not possible");
        }

        if(data.skills.length > 10){
            throw new Error("Skills not more than 10");
        }
        await User.findByIdAndUpdate(userId,data);
        res.send("User updated successfully");
    }catch(err){
        res.send("Update failed "+err.message);
    }
})

app.post("/login",async(req,res)=>{
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
            const token = await jwt.sign({_id:user._id},"DevTinder");
            console.log(token);
            // adding cookie to token
            res.cookie("token",token);
            res.send("Login Successful");
        }
    }catch(err){
        res.send("Error "+err.message);
    }
});

// get user profile
app.get("/profile",async(req,res)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token");
        }
        const decodeMessage = await jwt.verify(token,"DevTinder");
        const {_id} = decodeMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User Not Found");
        }
        res.send(user);
    }catch(err){
        res.send("Error "+err.message);
    }
});


connectDB().then(()=>{
    console.log("Database successfully connected");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777");
    });
}).catch((err)=>{
    console.error("Database not connected",err.message);
});

