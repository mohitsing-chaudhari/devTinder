const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://mohitsingsc:o3PuRH97DpoEERdx@vmchaudhari.jdgf0.mongodb.net/devTinder");
}

module.exports = {
    connectDB
}
