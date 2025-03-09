import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Carosoul = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const response = await axios.get("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/top");
        setTopRecipes(response.data);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="card" style={{ height: "400px" }}>
          <div className="card-body d-flex align-items-center justify-content-center">
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mb-0">Loading top recipes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (topRecipes.length === 0) {
    return null;
  }

  return (
    <div id="recipeCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {topRecipes.map((recipe, index) => (
          <div key={recipe._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <Link to={`/view-recipe/${recipe._id}`}>
              <img 
                src={recipe.image || 'https://via.placeholder.com/800x400?text=No+Image'} 
                className="d-block w-100" 
                alt={recipe.title} 
                style={{ height: "400px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                }}
              />
              <div className="carousel-caption">
                <h5>{recipe.title}</h5>
                <p className="mb-0">{recipe.category}</p>
                <small className="text-white">
                  <i className="bi bi-eye me-1"></i> {recipe.views || 0} views
                </small>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#recipeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#recipeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carosoul;
