const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET_KEY ="LOGIN";
// const { log } = require('console');
const collection = require("./config");
const { log } = require('console');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

//register User
// app.post("/Signup",async (req,res)=>{
//     const data = {
//         name:req.body.username,
//         password:req.body.password
//     }
//     const existingUser = await collection.findOne({name: data.name});
//     if(existingUser){
//         res.send("User already exists.Please choose a different username")
//     }else{
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(data.password, saltRounds);

//         data.password = hashedPassword;

//         const userdata = await collection.insertMany(data);
//         console.log(userdata);
//     }
   
// });


//login user
// app.post("/login",async(req,res)=>{
//     try{
//        const check = await collection.findOne({name:req.body.username});
//        if(!check){
//         res.send("user name cannot found")
//        }
//        const isPasswordMatch = await bcrypt.compare(req.body.password,check.password)
//        if(isPasswordMatch){
//         res.render("home");
//        }else{
//         res.send("wrong password");
//        }
//     }catch{
//         res.send("wrong Details");
//     }
// })
const port = 5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})



app.post("/Signup",async (req,res)=>{
    const data = {
        name:req.body.username,
        password:req.body.password
    }
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists.Please choose a different username")
    }else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        // const token = jwt.sign({name:userdata.name,id :userdata},SECRET_KEY);
        // res.status(201).json(token)  
        // console.log(token); 
        if(userdata){
            res.render("login");
           } 
    }
   
});




app.post("/login",async(req,res)=>{
    try{
       const check = await collection.findOne({name:req.body.username});
       if(!check){
        res.send("user name cannot found")
       }
       const isPasswordMatch = await bcrypt.compare(req.body.password,check.password)
       if(!isPasswordMatch){
        return res.status(404).json({message:'Invalid password'});
       }
       const token = jwt.sign({name:check.name,id:check._id,password:check.name},SECRET_KEY);
       res.render('home')
       console.log(token)
       
    //    if(isPasswordMatch){
    //     res.render("home");
    //    }else{
    //     res.send("wrong password");
    //    }
    //    const token = jwt.sign({name:check.name,id:check},SECRET_KEY)
    //    res.status(201).json(token)
    // console.log(token);
    }catch{
        res.send("wrong Details");
    }
})
// const port = 5000;
// app.listen(port,()=>{
//     console.log(`server running on port ${port}`);
// })