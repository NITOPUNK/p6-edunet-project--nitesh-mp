const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router  = express.Router();

// routing all the user related requests 


// to regiter a user

router.post("/register",async (req,res)=>{

const {username,email,password}=req.body;



try{
    
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    else
    {
        const hashedPassword= await bcrypt.hash(password,10)
        const user=new User({username,email,password:hashedPassword})
        await user.save()
        res.json({message: "User Registred Successfully"})
        console.log("User Registration done")
    }
    }
   
catch(err)
{
    console.log(err)
}




})




//to login in user 

router.post("/login",async (req,res)=>{

    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });
    }
    catch(err)
    {
        console.log(err)
    }


})