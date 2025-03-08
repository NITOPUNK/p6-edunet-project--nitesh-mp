import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const EditRecipe = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
    category: "",
    image: "",
  });
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/${id}`);
        const recipe = response.data;
        setRecipeData({
          ...recipe,
          ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : ""
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
        alert("Failed to fetch recipe details");
        navigate("/my-recipes");
      }
    };

    fetchRecipe();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({ ...recipeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipe = {
      id,
      title: recipeData.title,
      description: recipeData.description,
      ingredients: recipeData.ingredients.split(",").map(item => item.trim()).filter(item => item),
      instructions: recipeData.instructions,
      category: recipeData.category,
      image: recipeData.image,
      username: window.localStorage.getItem("username")
    };

    try {
      await axios.post("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/update", recipe, {
        headers: {
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

  if (!cookies.access_token) {
    navigate("/login");
    return null;
  }

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
            placeholder="List ingredients separated by commas (e.g., 2 cups flour, 1 cup sugar, 3 eggs)"
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
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={recipeData.image}
            onChange={handleChange}
            placeholder="Paste image URL"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/my-recipes")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
