const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    createdByName: { type: String, required: true },
    views: { type: Number, default: 0 }, // default views assign  0
    searchCount: { type: Number, default: 0 } // to aid with discover of more searched recipes 
}, { timestamps: true });

const RecipesModel = mongoose.model('Recipes', RecipesSchema);

module.exports = { RecipesModel };