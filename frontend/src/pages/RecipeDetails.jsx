import React from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) {
    return <h2 className="text-center mt-5 text-danger">Recipe Not Found</h2>;
  }

  return (
    <div className="container mt-5">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="img-fluid mb-3" />
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeDetails;
