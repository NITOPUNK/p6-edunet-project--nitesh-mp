const express = require('express');
const recipe =require('../models/recipe')


const router = express.Router();

// routing all the recipe related requests

// to add a  new recipe 

router.post("/add",async (req,res)=>{
    const {title,description,ingredients,instructions,category,image,username}=req.body;
    try{
        const newRecipe=new recipe({title,description,ingredients,instructions,category,image,username})
        await newRecipe.save()
        .then(()=>{
        res.json({message:"Recipe added successfully"})
        })
         .catch((err)=>{
            console.log(err)
        })
    }
    catch(err)
    {
        console.log(err)
    }
});


// update an existing recipe 

router.post("/update",async (req,res)=>{
    const {id,title,description,ingredients,instructions,category,image,username}=req.body;
    try{
        await recipe.findOneAndUpdate({_id:id},{title,description,ingredients,instructions,category,image,username})
        .then(()=>{
        res.json({message:"Recipe updated successfully"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    catch(err)
    {
        console.log(err)
    }
});



// to delete  a recipe via query  id 

router.delete("/delete",async (req,res)=>{
    const id=req.query.id;
    try{
        await recipe.findByIdAndDelete(id)
        .then(()=>{
        res.json({message:"Recipe deleted successfully"})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    catch(err)
    {
        console.log(err)
    }
});





// to get all the recipes to display on the discover page
router.get("/discover", async (req, res) => {
    try {
        const allRecipes = await recipe.find();
        res.status(200).json(allRecipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while fetching recipes" });
    }
});


// search recipe by title,category(like breakfast or lunch   or diiner) or username

router.get("/search",async (req,res)=>{
    const query=req.query.query;
    try{
        
        const searchResult=await recipe.find({
            $or:[
            {title:{$regex:query,$options:'i'}},
            {category:{$regex:query,$options:'i'}},
            {username:{$regex:query,$options:'i'}}
           ]
        }
        ).select("title image createdByName updatedAt instructions")


        // check whether search quert  exists 
        if(searchResult.length===0)
        {
            res.json({message:"No search result found"})
        }
        else{
            res.json(searchResult)
        }


    }
    catch(err)
    {
        console.log(err)
    }


});







module.exports = router;