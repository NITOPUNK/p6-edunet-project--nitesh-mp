const express = require('express');
const mongoose = require('mongoose');
const { RecipesModel } = require('../models/recipe.js');
const { UserModel } = require('../models/user.js');
const { verifyToken } = require('./user.js');

const router = express.Router();

// routing all the recipe related requests

// to add a new recipe
router.post("/add", verifyToken, async (req, res) => {
    const { title, description, ingredients, instructions, category, image, username } = req.body;
    try {
        const newRecipe = new RecipesModel({ title, description, ingredients, instructions, category, image, username });
        await newRecipe.save()
            .then(() => {
                res.json({ message: "Recipe added successfully" });
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
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

// Save a Recipe
router.put("/", verifyToken, async (req, res) => {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedRecipes.push(recipe);
        await user.save();
        res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipesModel.find({
            _id: { $in: user.savedRecipes },
        });

        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
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