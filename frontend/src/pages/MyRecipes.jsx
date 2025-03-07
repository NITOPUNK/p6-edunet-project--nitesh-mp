import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const userId = window.localStorage.getItem("userID");
        const response = await axios.get(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/savedRecipes/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    const fetchMyRecipes = async () => {
      try {
        const userId = window.localStorage.getItem("userID");
        const response = await axios.get(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/userRecipes/${userId}`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        setMyRecipes(response.data.myRecipes);
      } catch (error) {
        console.error("Error fetching my recipes:", error);
      }
    };

    fetchSavedRecipes();
    fetchMyRecipes();
  }, [cookies.access_token]);

  const removeRecipe = async (id, type) => {
    try {
      if (type === "saved") {
        await axios.put(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/removeSavedRecipe`, { recipeID: id }, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        });
        setSavedRecipes(savedRecipes.filter(recipe => recipe._id !== id));
      } else if (type === "my") {
        await axios.delete(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/delete`, {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
          data: { recipeID: id },
        });
        setMyRecipes(myRecipes.filter(recipe => recipe._id !== id));
      }
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Saved Recipes</h2>
      <div className="row">
        {savedRecipes.length === 0 ? <p>No saved recipes yet.</p> : savedRecipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                <Link to={`/view-recipe/${recipe._id}`} className="btn btn-info me-2">View</Link>
                <button className="btn btn-danger" onClick={() => removeRecipe(recipe._id, "saved")}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-5">My Recipes (Editable)</h2>
      <div className="row">
        {myRecipes.length === 0 ? <p>You haven't added any recipes yet.</p> : myRecipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img src={recipe.image} className="card-img-top" alt={recipe.title} />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text"><strong>Category:</strong> {recipe.category}</p>
                <Link to={`/view-recipe/${recipe._id}`} className="btn btn-info me-2">View</Link>
                <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-primary me-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => removeRecipe(recipe._id, "my")}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
