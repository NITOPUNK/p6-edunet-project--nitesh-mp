const mongoose = require('mongoose');


const RecipeSchema = new mongoose.schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      ingredients: { type: [String], required: true },
      instructions: { type: String, required: true },
      category: { type: String, required: true },
      image: { type: String, required: false },
      username: { type: String, required: true }, 
    },
    { timestamps: true }
  );


  const Recipe = mongoose.model("Recipe", RecipeSchema);
 module.exports = Recipe;