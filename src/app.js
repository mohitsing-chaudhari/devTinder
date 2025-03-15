const express = require("express");
const app = express();
const {connectDB} = require("./config/database");
const cookieParser = require('cookie-parser');

app.use(express.json());// it converts all data into json 
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB().then(()=>{
    console.log("Database successfully connected");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777");
    });
}).catch((err)=>{
    console.error("Database not connected",err.message);
});

