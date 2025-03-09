import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Carosoul = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const response = await axios.get("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/top");
        setTopRecipes(response.data);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
        setError("Failed to load top recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchTopRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="card" aria-hidden="true">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
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
                <p>{recipe.category}</p>
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
