const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://mohitsingsc:mohitsing2005@vmchaudhari.jdgf0.mongodb.net/devTinder");
}

module.exports = {
    connectDB
}
