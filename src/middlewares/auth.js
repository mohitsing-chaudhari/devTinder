function adminAuth(req,res,next){
    const token = "xyz";
    if(token === "xyz"){
        next();
    }else{
        res.status(401).send("Unauthorized admin");
    }
}

function userAuth(req,res,next){
    const token = "xyz";
    if(token === "xyz"){
        next();
    }else{
        res.status(401).send("Unauthorized User");
    }
}
module.exports = {
    adminAuth,
    userAuth
}