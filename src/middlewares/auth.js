const jwt = require("jsonwebtoken");
const  User  = require("../models/user");

async function userAuth(req,res,next){
    try{
        const cookie = req.cookies;
        const{token} = cookie;
    
        if(!token){
            throw new Error("Invalid Token");
        }
    
        const decodeMessage = await jwt.verify(token,"DevTinder");
    
        const{_id}=decodeMessage;
    
        const user = await User.findById(_id);
    
        req.user = user;
        next();
    }catch(err){
        res.send("Error:- " +err.message);
    }

}
module.exports = {
    userAuth
}