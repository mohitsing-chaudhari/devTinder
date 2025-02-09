const express = require("express");

const app = express();

app.use("/user",(req,res)=>{
    throw new Error("dbdbbdb");
    res.send("Data successfully send");
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.send("Something went wrong");
    }
})
app.listen(7777);