import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carosoul from '../components/Carosoul';

const Discover = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/discover");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Carosoul />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Discover Recipes</h2>
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4" key={recipe._id}>
              <div className="card shadow-sm mb-4">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <Link to={`/view-recipe/${recipe._id}`} className="btn btn-primary w-100">
                    View Recipe
                  </Link>
                </div>
                <div className="card-footer text-muted">Created by {recipe.createdByName}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Discover;
