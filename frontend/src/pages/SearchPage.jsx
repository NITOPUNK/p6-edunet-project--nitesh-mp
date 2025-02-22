import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = ({ recipes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter recipes based on search query
    const results = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredRecipes(results);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Search Recipes</h2>

      {/* Search Form */}
      <form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
        <input
          className="form-control w-50"
          type="search"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary ms-2" type="submit">
          Search
        </button>
      </form>

      {/* Display Search Results */}
      {filteredRecipes.length > 0 ? (
        <div className="row">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">{recipe.description.substring(0, 80)}...</p>
                  <Link to={`/recipe/${recipe.id}`} className="btn btn-primary">
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
