const express = require('express');
const mongoose = require('mongoose');
const { RecipesModel } = require('../models/recipe.js');
const User = require('../models/user.js');
const { verifyToken } = require('./auth.js');

const router = express.Router();

// routing all the recipe related requests



// to add a new recipe
router.post("/add", verifyToken, async (req, res) => {
    const { title, description, ingredients, instructions, category, image, createdBy, createdByName } = req.body;
    try {
        // Create and save the new recipe
        const newRecipe = new RecipesModel({ 
            title, 
            description, 
            ingredients, 
            instructions, 
            category, 
            image, 
            createdBy, 
            createdByName 
        });
        
        const savedRecipe = await newRecipe.save();
        
        // Update the user's createdRecipes array with just the ID
        const updatedUser = await User.findByIdAndUpdate(
            createdBy,
            { $push: { createdRecipes: savedRecipe._id.toString() } },
            { new: true }
        );

        if (!updatedUser) {
            throw new Error("User not found");
        }
        
        res.status(201).json({ 
            message: "Recipe added successfully",
            recipe: savedRecipe,
            userRecipes: updatedUser.createdRecipes
        });
    } catch (err) {
        console.error("Error adding recipe:", err);
        res.status(500).json({ 
            message: "Failed to add recipe",
            error: err.message 
        });
    }
});

// Save a Recipe
router.put("/save", verifyToken, async (req, res) => {
    const { userID, recipeID } = req.body;
    
    try {
        // Check if recipe exists
        const recipe = await RecipesModel.findById(recipeID);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Check if user exists and update their savedRecipes with just the ID
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { $addToSet: { savedRecipes: recipeID } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Recipe saved successfully",
            savedRecipes: updatedUser.savedRecipes
        });
    } catch (err) {
        console.error("Error saving recipe:", err);
        res.status(500).json({ 
            message: "Failed to save recipe",
            error: err.message 
        });
    }
});

// Remove a saved recipe
router.put("/removeSaved", verifyToken, async (req, res) => {
    const { userID, recipeID } = req.body;
    
    try {
        // Check if user exists and update their savedRecipes
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { $pull: { savedRecipes: recipeID } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ 
            message: "Recipe removed from saved recipes",
            savedRecipes: updatedUser.savedRecipes
        });
    } catch (err) {
        console.error("Error removing saved recipe:", err);
        res.status(500).json({ 
            message: "Failed to remove recipe from saved recipes",
            error: err.message 
        });
    }
});

// update an existing recipe
router.post("/update", verifyToken, async (req, res) => {
    const { id, title, description, ingredients, instructions, category, image, username } = req.body;
    try {
        await RecipesModel.findOneAndUpdate({ _id: id }, { title, description, ingredients, instructions, category, image, username })
            .then(() => {
                res.json({ message: "Recipe updated successfully" });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

// to delete a recipe via query id
router.delete("/delete", verifyToken, async (req, res) => {
    const id = req.query.id;
    try {
        await RecipesModel.findByIdAndDelete(id)
            .then(() => {
                res.json({ message: "Recipe deleted successfully" });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
});

// to get all the recipes to display on the discover page
router.get("/discover", async (req, res) => {
    try {
        const allRecipes = await RecipesModel.find();
        res.status(200).json(allRecipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while fetching recipes" });
    }
});

// search recipe by title, category (like breakfast or lunch or dinner) or username
router.get("/search", async (req, res) => {
    const query = req.query.query;
    try {
        const searchResult = await RecipesModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { username: { $regex: query, $options: 'i' } }
            ]
        }).select("title image createdByName updatedAt instructions");

        // check whether search query exists
        if (searchResult.length === 0) {
            res.json({ message: "No search result found" });
        } else {
            res.json(searchResult);
        }
    } catch (err) {
        console.log(err);
    }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
    try {
        const result = await RecipesModel.findById(req.params.recipeId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get saved recipes for a user
router.get("/savedRecipes/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch all saved recipes using the IDs
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes }
        });

        res.status(200).json({ 
            savedRecipes: savedRecipes 
        });
    } catch (err) {
        console.error("Error fetching saved recipes:", err);
        res.status(500).json({ 
            message: "Failed to fetch saved recipes",
            error: err.message 
        });
    }
});

// Get created recipes for a user
router.get("/createdRecipes/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch all created recipes using the IDs
        const createdRecipes = await RecipesModel.find({
            _id: { $in: user.createdRecipes }
        });

        res.status(200).json({ 
            createdRecipes: createdRecipes 
        });
    } catch (err) {
        console.error("Error fetching created recipes:", err);
        res.status(500).json({ 
            message: "Failed to fetch created recipes",
            error: err.message 
        });
    }
});

// Get top recipes
router.get("/top", async (req, res) => {
    try {
        const topRecipes = await RecipesModel.find().sort({ searchCount: -1 }).limit(5); // Adjust the sorting and limit as needed
        res.status(200).json(topRecipes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "An error occurred while fetching top recipes" });
    }
});

module.exports = router;