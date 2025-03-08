import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "", // Add description to the state
    ingredients: "",
    instructions: "",
    category: "",
    image: "", // Add image to the state
  });
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = {
      title: recipeData.title,
      description: recipeData.description, // Include description
      ingredients: recipeData.ingredients.split(","),
      instructions: recipeData.instructions,
      category: recipeData.category,
      image: recipeData.image,
      createdBy: window.localStorage.getItem("userID"),
      createdByName: window.localStorage.getItem("username"),
    };

    try {
      await axios.post("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/add", recipe, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      alert("Recipe submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create a New Recipe</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg">
        {/* Recipe Title */}
        <div className="mb-3">
          <label className="form-label">Recipe Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Short description of the recipe"
          />
        </div>

        {/* Ingredients */}
        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            required
            rows="4"
            placeholder="List ingredients separated by commas"
          />
        </div>

        {/* Instructions */}
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Step-by-step instructions"
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={recipeData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label className="form-label">Paste Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={recipeData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
