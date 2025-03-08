import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://p6-edunet-project-nitesh-mp.onrender.com/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe. Please try again later.");
      } finally {
        setLoading(false);
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
      const response = await axios.put(
        "https://p6-edunet-project-nitesh-mp.onrender.com/recipe/save",
        {
          userID,
          recipeID: id
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      if (error.response?.status === 401) {
        alert("Please login again");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to save recipe. Please try again.");
      }
    }
  };

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

  if (!recipe) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Recipe not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow">
            <img
              src={recipe.image || 'https://via.placeholder.com/800x400?text=No+Image'}
              className="card-img-top"
              alt={recipe.title}
              style={{ height: "400px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
              }}
            />
            <div className="card-body">
              <h2 className="card-title mb-4">{recipe.title}</h2>
              
              <div className="mb-4">
                <span className="badge bg-primary me-2">{recipe.category}</span>
                <small className="text-muted">Created by: {recipe.createdByName}</small>
                <div className="mt-2">
                  <small className="text-muted">
                    <i className="bi bi-eye me-1"></i> {recipe.views || 0} views
                  </small>
                </div>
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p className="card-text">{recipe.description}</p>
              </div>

              <div className="mb-4">
                <h5>Ingredients</h5>
                <ul className="list-group list-group-flush">
                  {Array.isArray(recipe.ingredients) ? (
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="list-group-item">{ingredient}</li>
                    ))
                  ) : (
                    <li className="list-group-item">{recipe.ingredients}</li>
                  )}
                </ul>
              </div>

              <div className="mb-4">
                <h5>Instructions</h5>
                <p className="card-text" style={{ whiteSpace: 'pre-line' }}>
                  {recipe.instructions}
                </p>
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveRecipe}
                >
                  Save Recipe
                </button>
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
