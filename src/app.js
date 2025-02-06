const express = require("express");

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from test")
})

app.use("/hello",(req,res)=>{
    res.send("Hello hello hello");
})

app.use("/",(req,res)=>{
    res.send("Jay shri ram");
})

app.listen(7777);