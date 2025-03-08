import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
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
      setError("Failed to fetch recipes. Please try again later.");
      if (error.response?.status === 401) {
        alert("Please login again");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check authentication
    if (!cookies.access_token || !userID) {
      alert("Please login to view your recipes");
      navigate("/login");
      return;
    }

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
      // Remove the deleted recipe from the list
      setCreatedRecipes(prev => prev.filter(recipe => recipe._id !== recipeId));
      alert("Recipe deleted successfully");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe");
    }
  };

  const handleRemoveSaved = async (recipeId) => {
    try {
      await axios.put(
        "https://p6-edunet-project-nitesh-mp.onrender.com/recipe/removeSaved",
        {
          userID,
          recipeID: recipeId
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      // Remove the recipe from saved recipes list
      setSavedRecipes(prev => prev.filter(recipe => recipe._id !== recipeId));
      alert("Recipe removed from saved recipes");
    } catch (error) {
      console.error("Error removing saved recipe:", error);
      alert("Failed to remove recipe from saved recipes");
    }
  };

  const RecipeCard = ({ recipe, isCreated = false, onRemoveSaved }) => (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">
        <img
          src={recipe.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          className="card-img-top"
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text flex-grow-1">{recipe.description}</p>
          <div className="mt-2">
            <p className="card-text">
              <small className="text-muted">Category: {recipe.category}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Created by: {recipe.createdByName}</small>
            </p>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Link to={`/view-recipe/${recipe._id}`} className="btn btn-primary">
              View Recipe
            </Link>
            {isCreated ? (
              <div className="btn-group">
                <Link to={`/edit-recipe/${recipe._id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={() => onRemoveSaved(recipe._id)}
                className="btn btn-danger"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Recipes</h2>
      
      {/* Created Recipes Section */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Created Recipes</h3>
          <Link to="/create-recipe" className="btn btn-success">
            Create New Recipe
          </Link>
        </div>
        {createdRecipes.length === 0 ? (
          <div className="alert alert-info">
            You haven't created any recipes yet. 
            <Link to="/create-recipe" className="alert-link ms-2">
              Create your first recipe!
            </Link>
          </div>
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
        <h3 className="mb-3">Saved Recipes</h3>
        {savedRecipes.length === 0 ? (
          <div className="alert alert-info">
            You haven't saved any recipes yet. 
            <Link to="/" className="alert-link ms-2">
              Discover recipes!
            </Link>
          </div>
        ) : (
          <div className="row">
            {savedRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe._id} 
                recipe={recipe} 
                onRemoveSaved={handleRemoveSaved}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;
