import React, { useState, useEffect } from "react";
import axios from "axios";

const Carosoul = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    const fetchTopRecipes = async () => {
      try {
        const response = await axios.get("https://mern-recipe-app1-server.onrender.com/recipe/top");
        setTopRecipes(response.data);
      } catch (error) {
        console.error("Error fetching top recipes:", error);
      }
    };

    fetchTopRecipes();
  }, []);

  return (
    <div id="recipeCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {topRecipes.map((recipe, index) => (
          <div key={recipe._id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={recipe.image} className="d-block w-100" alt={recipe.title} style={{ height: "400px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{recipe.title}</h5>
              <p>{recipe.category}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Carousel Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#recipeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#recipeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default Carosoul;
