import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);

  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: null,
    imagePreview: "",
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://mern-recipe-app1-server.onrender.com/recipe/${id}`);
        const recipe = response.data;
        setRecipeData({
          title: recipe.title,
          ingredients: recipe.ingredients.join(", "),
          instructions: recipe.instructions,
          category: recipe.category,
          image: null,
          imagePreview: recipe.image,
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setRecipeData({ ...recipeData, image: file, imagePreview: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("ingredients", recipeData.ingredients.split(","));
    formData.append("instructions", recipeData.instructions);
    formData.append("category", recipeData.category);
    if (recipeData.image) {
      formData.append("image", recipeData.image);
    }

    try {
      await axios.post(`https://mern-recipe-app1-server.onrender.com/recipe/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      alert("Recipe updated successfully!");
      navigate("/my-recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Recipe</h2>
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
          />
          {recipeData.imagePreview && (
            <img
              src={recipeData.imagePreview}
              alt="Recipe Preview"
              className="mt-3 img-fluid rounded"
              style={{ maxHeight: "200px" }}
            />
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
