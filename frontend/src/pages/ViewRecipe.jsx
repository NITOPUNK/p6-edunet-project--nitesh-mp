import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

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
    if (!cookies.access_token) {
      alert("Please login to save recipes");
      navigate("/login");
      return;
    }

    const userID = window.localStorage.getItem("userID");
    if (!userID) {
      alert("User information not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.put("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/save", {
        userID,
        recipeID: id
      }, {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      });
      
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert("Recipe saved successfully!");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Failed to save recipe. Please try again.");
      } else {
        alert("Failed to save recipe. Please check your connection and try again.");
      }
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
