const express = require("express");

const app = express();

app.use("/user",(req,res,next)=>{
    console.log("Route handler 1");
    // res.send("Response 1");
    next();
},
(req,res,next)=>{
    console.log("Route handler 2");
    // res.send("Response 2");
    next()
},
(req,res)=>{
    console.log("Route handler 3");
    res.send("Response 3");
}
);


app.listen(7777);