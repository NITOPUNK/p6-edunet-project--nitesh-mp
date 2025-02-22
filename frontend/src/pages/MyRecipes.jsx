import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const mockSavedRecipes = [
      { id: 1, title: "Spaghetti Carbonara", image: "https://source.unsplash.com/400x300/?pasta", category: "Dinner" },
      { id: 2, title: "Chocolate Cake", image: "https://source.unsplash.com/400x300/?cake", category: "Dessert" },
    ];
    setSavedRecipes(mockSavedRecipes);

    const mockMyRecipes = [
      { id: 3, title: "Avocado Toast", image: "https://source.unsplash.com/400x300/?avocado", category: "Breakfast" },
      { id: 4, title: "Mango Smoothie", image: "https://source.unsplash.com/400x300/?mango", category: "Beverage" },
    ];
    setMyRecipes(mockMyRecipes);
  }, []);

  const removeRecipe = (id, type) => {
    if (type === "saved") {
      setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== id));
    } else if (type === "my") {
      setMyRecipes(myRecipes.filter(recipe => recipe.id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Saved Recipes</h2>
      <div className="row">
        {savedRecipes.length === 0 ? <p>No saved recipes yet.</p> : savedRecipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                <Link to={`/view-recipe/${recipe.id}`} className="btn btn-info me-2">View</Link>
                <button className="btn btn-danger" onClick={() => removeRecipe(recipe.id, "saved")}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-5">My Recipes (Editable)</h2>
      <div className="row">
        {myRecipes.length === 0 ? <p>You haven't added any recipes yet.</p> : myRecipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                <Link to={`/view-recipe/${recipe.id}`} className="btn btn-info me-2">View</Link>
                <Link to={`/edit-recipe/${recipe.id}`} className="btn btn-primary me-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => removeRecipe(recipe.id, "my")}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedRecipes;
