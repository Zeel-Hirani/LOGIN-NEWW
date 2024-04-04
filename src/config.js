// const { default: mongoose } = require("mongoose")
const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://127.0.0.1:27017/Login")

connect.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database can not connected");
})


//Create a schema
const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
})

//collection port
const collection = new mongoose.model("user",LoginSchema);
module.exports = collection;