const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('../models/user')
const Recipe=require('../models/recipe')



const app=express()
const PORT=3000
app.use(express.json());
app.use(cors());



// auth for user login and registration
app.use("/auth",require('../routes/authRt'))

//recipe for recipe add , update , delete  and get all for recipes
app.use("/recipe",require('../routes/recipeRt'))




mongoose.connect(process.env.MONGO_URL).then(
    ()=>console.log("DB connected successfully..")
).catch(
    (err)=>console.log(err)
)

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})