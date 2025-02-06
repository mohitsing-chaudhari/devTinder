const express = require("express");

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Mohit",gfName:"Vaishnavi"});
});

app.post("/user",(req,res)=>{
    res.send("Data posted successfully");
});

app.put("/user",(req,res)=>{
    res.send("Data putted successfully");
});

app.patch("/user",(req,res)=>{
    res.send("Data patched successfully");
});

app.delete("/user",(req,res)=>{
    res.send("Data deleted successfully");
});

app.listen(7777);