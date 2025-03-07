import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: null,
  });
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleImageChange = (e) => {
    setRecipeData({ ...recipeData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("ingredients", recipeData.ingredients.split(","));
    formData.append("instructions", recipeData.instructions);
    formData.append("category", recipeData.category);
    formData.append("image", recipeData.image);
    formData.append("createdBy", window.localStorage.getItem("userID"));
    formData.append("createdByName", window.localStorage.getItem("username"));

    try {
      await axios.post("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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

        {/* Image Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
            required
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
