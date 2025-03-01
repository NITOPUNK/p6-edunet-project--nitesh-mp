const express = require('express');
const recipe =require('../models/recipe')


const router = require("Router");

// routing all the recipe related requests

// to add a  new recipe 

router.post("/add",async (req,res)=>{
    const {title,ingredients,instructions,category,image,username}=req.body;
    try{
        const newRecipe=new recipe({title,ingredients,instructions,category,image,username})
        await newRecipe.save()
        res.json({message:"Recipe added successfully"})
    }
    catch(err)
    {
        console.log(err)
    }
});


// update an existing recipe 

router.post("/update",async (req,res)=>{
    const {id,title,ingredients,instructions,category,image,username}=req.body;
    try{
        await recipe.findOneAndUpdate({_id:id},{title,ingredients,instructions,category,image,username})
        res.json({message:"Recipe updated successfully"})
    }
    catch(err)
    {
        console.log(err)
    }
});



// to delete  a recipe via param  id 

router.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id;
    try{
        await recipe.findByIdAndDelete(id)
        res.json({message:"Recipe deleted successfully"})
    }
    catch(err)
    {
        console.log(err)
    }
});





// to get all the recipes to dispaly on the diacover page 


router.get("/discover",async (req,res)=>{    
    try{
        const allRecipes=await recipe.find()
        res.json(allRecipes)
    }
    catch(err)
    {
        console.log(err)
    }
});