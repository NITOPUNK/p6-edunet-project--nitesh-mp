import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid mb-3" />
      <p><strong>Category:</strong> {recipe.category}</p>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
      <p><strong>Created by:</strong> {recipe.username}</p>
    </div>
  );
};

export default ViewRecipe;
