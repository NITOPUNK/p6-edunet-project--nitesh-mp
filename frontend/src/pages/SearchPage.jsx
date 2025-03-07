import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`https://mern-recipe-app1-server.onrender.com/recipe/search?query=${query}`);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (query) {
      fetchRecipes();
    }
  }, [query]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Search Results for "{query}"</h2>

      {/* Display Search Results */}
      {filteredRecipes.length > 0 ? (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-3">
              <div className="card">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description.substring(0, 80)}...</p>
                  <Link to={`/view-recipe/${recipe._id}`} className="btn btn-primary">
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No recipes found.</p>
      )}
    </div>
  );
};

export default SearchPage;
