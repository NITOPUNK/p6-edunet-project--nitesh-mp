import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Mock data (Replace this with API call)
    const mockRecipe = {
      id,
      title: "Sample Recipe",
      image: "https://source.unsplash.com/400x300/?food",
      category: "Dinner",
      instructions: "Here are the steps to make this delicious recipe...",
    };
    setRecipe(mockRecipe);
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid mb-3" />
      <p><strong>Category:</strong> {recipe.category}</p>
      <h4>Instructions:</h4>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default ViewRecipe;
