import React from 'react';
import { Link } from 'react-router-dom';
import Carosoul from '../components/Carosoul';
import image1 from "../components/i.jpeg";

const Discover = () => {
  // Sample data
  const recipes = [
    { id: 1, title: "Pasta", image: image1, description: "A delicious Italian pasta dish." },
    { id: 2, title: "Paneer Curry", image: image1, description: "A flavorful Indian-style curry." },
    { id: 3, title: "Chocolate Cake", image: image1, description: "Rich and moist chocolate cake." }
  ];

  return (
    <>
      <Carosoul />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Discover Recipes</h2>
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4" key={recipe.id}>
              <div className="card shadow-sm mb-4">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <Link to={`/view-recipe/${recipe.id}`} className="btn btn-primary w-100">
                    View Recipe
                  </Link>
                </div>
                <div className="card-footer text-muted">Last updated 3 mins ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
