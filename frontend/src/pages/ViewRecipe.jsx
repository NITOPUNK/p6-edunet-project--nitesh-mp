import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSaveRecipe = async () => {
    const userId = window.localStorage.getItem("userID");
    try {
      await axios.put("https://p6-edunet-project-nitesh-mp.onrender.com/recipe", {
        userID: userId,
        recipeID: id
      }, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Failed to save recipe. Please try again.");
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid mb-3" />
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      <h4>Ingredients:</h4>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
      <p><strong>Created by:</strong> {recipe.createdByName}</p>
      <button className="btn btn-primary mt-3" onClick={handleSaveRecipe}>Save Recipe</button>
    </div>
  );
};

export default ViewRecipe;
