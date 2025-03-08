import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://p6-edunet-project-nitesh-mp.onrender.com/recipe/search?query=${query}`
        );
        if (response.data.message) {
          // If we get a message, it means no results were found
          setFilteredRecipes([]);
        } else {
          setFilteredRecipes(response.data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to fetch recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchRecipes();
    } else {
      setFilteredRecipes([]);
    }
  }, [query]);

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
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        {query ? `Search Results for "${query}"` : "Search Recipes"}
      </h2>

      {!query && (
        <div className="text-center mb-4">
          <p className="text-muted">Enter a search term to find recipes</p>
        </div>
      )}

      {query && filteredRecipes.length === 0 && (
        <div className="text-center">
          <p className="text-muted">No recipes found matching "{query}"</p>
          <Link to="/" className="btn btn-primary">
            Browse All Recipes
          </Link>
        </div>
      )}

      {filteredRecipes.length > 0 && (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
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
                  <p className="card-text flex-grow-1">
                    {recipe.description
                      ? `${recipe.description.substring(0, 100)}${
                          recipe.description.length > 100 ? '...' : ''
                        }`
                      : 'No description available'}
                  </p>
                  <div className="mt-auto">
                    <p className="card-text">
                      <small className="text-muted">By: {recipe.createdByName || 'Unknown'}</small>
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">
                        <i className="bi bi-eye me-1"></i> {recipe.views || 0} views
                      </small>
                      <small className="text-muted">
                        <i className="bi bi-search me-1"></i> {recipe.searchCount || 0} searches
                      </small>
                    </div>
                    <Link
                      to={`/view-recipe/${recipe._id}`}
                      className="btn btn-primary w-100"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
