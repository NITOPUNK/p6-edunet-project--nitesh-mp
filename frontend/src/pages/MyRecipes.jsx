import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    // Check authentication
    if (!cookies.access_token || !userID) {
      alert("Please login to view your recipes");
      navigate("/login");
      return;
    }

    const fetchRecipes = async () => {
      try {
        // Fetch saved recipes
        const savedResponse = await axios.get(
          `https://p6-edunet-project-nitesh-mp.onrender.com/recipe/savedRecipes/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );
        setSavedRecipes(savedResponse.data.savedRecipes || []);

        // Fetch created recipes
        const createdResponse = await axios.get(
          `https://p6-edunet-project-nitesh-mp.onrender.com/recipe/createdRecipes/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        );
        setCreatedRecipes(createdResponse.data.createdRecipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        if (error.response?.status === 401) {
          alert("Please login again");
          navigate("/login");
        }
      }
    };

    fetchRecipes();
  }, [cookies.access_token, userID, navigate]);

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(
        `https://p6-edunet-project-nitesh-mp.onrender.com/recipe/delete?id=${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      // Refresh the recipes lists
      setCreatedRecipes(prev => prev.filter(recipe => recipe._id !== recipeId));
      alert("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
    }
  };

  const RecipeCard = ({ recipe, isCreated = false }) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={recipe.image}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">{recipe.description}</p>
          <p className="card-text">
            <small className="text-muted">Category: {recipe.category}</small>
          </p>
          <div className="d-flex justify-content-between">
            <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
              View Recipe
            </Link>
            {isCreated && (
              <>
                <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Recipes</h2>
      
      {/* Created Recipes Section */}
      <div className="mb-5">
        <h3>Created Recipes</h3>
        {createdRecipes.length === 0 ? (
          <p>You haven't created any recipes yet.</p>
        ) : (
          <div className="row">
            {createdRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} isCreated={true} />
            ))}
          </div>
        )}
      </div>

      {/* Saved Recipes Section */}
      <div>
        <h3>Saved Recipes</h3>
        {savedRecipes.length === 0 ? (
          <p>You haven't saved any recipes yet.</p>
        ) : (
          <div className="row">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
