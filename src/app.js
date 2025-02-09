const express = require("express");

const app = express();

const {adminAuth,userAuth} = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.get("/user/getData",userAuth,(req,res)=>{
    res.send("User data got successfully");
});

app.get("/user/login",(req,res)=>{
    res.send("User logged in successfully");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Send");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user");
});
app.listen(7777);