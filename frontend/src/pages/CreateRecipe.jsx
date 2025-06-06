import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: ""
  });
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cookies.access_token) {
      alert("Please login to create a recipe");
      navigate("/login");
      return;
    }

    const userID = window.localStorage.getItem("userID");
    const username = window.localStorage.getItem("username");

    if (!userID || !username) {
      alert("User information not found. Please login again.");
      navigate("/login");
      return;
    }

    const recipe = {
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients.split(",").map(item => item.trim()),
      instructions: recipe.instructions,
      category: recipe.category,
      image: recipe.image,
      createdBy: userID,
      createdByName: username,
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
      if (error.response) {
        alert(`Failed to submit recipe: ${error.response.data.message || 'Please try again.'}`);
      } else {
        alert("Failed to submit recipe. Please try again.");
      }
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
            value={recipe.title}
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
            value={recipe.description}
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
            value={recipe.ingredients}
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
            value={recipe.instructions}
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
            value={recipe.category}
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
            value={recipe.image}
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