const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: Array, required: true },
    instructions: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdByName: { type: String },
    views: { type: Number, default: 0 },
    searchCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Recipes", RecipeSchema);