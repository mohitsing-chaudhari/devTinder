const validator = require("validator");

const validateUser = (req)=>{
    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Please enter valid firstname or lastname");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong Password");
    }

}

module.exports = {
    validateUser
}