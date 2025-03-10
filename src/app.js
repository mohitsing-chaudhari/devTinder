const express = require("express");

const app = express();

const {connectDB} = require("./config/database");

const User = require("./models/user");

app.use(express.json());// it converts all data into json 


//sign up API
app.post("/signup",async(req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added successfully");
    }catch(err){
        res.status(400).send("Unable to save user"+err.message);
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



connectDB().then(()=>{
    console.log("Database successfully connected");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777");
    });
}).catch((err)=>{
    console.error("Database not connected",err.message);
});

