import React from "react";
import image1 from "../components/i.jpeg"; // Adjust path accordingly

const Carosoul = () => {
 


const topRecipes = [
  { id: 1, title: "Pasta", image: image1 },
  { id: 2, title: "Paneer Curry", image: image1 },
  { id: 3, title: "Choco Lava Cake", image: image1 }
];


  return (
    <div id="recipeCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
      <div className="carousel-inner">
        {topRecipes.map((recipe, index) => (
          <div key={recipe.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img src={recipe.image} className="d-block w-100" alt={recipe.title} style={{ height: "400px", objectFit: "cover" }} />

            <div className="carousel-caption d-none d-md-block">
              <h5>{recipe.title}</h5>
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
