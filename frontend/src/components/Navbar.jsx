import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ recipes }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const foundRecipe = recipes.find(
      (recipe) => recipe.title.toLowerCase() === searchQuery.toLowerCase()
    );

    if (foundRecipe) {
      navigate(`/recipe/${foundRecipe.id}`);
    } else {
      alert("Recipe not found!");
    }
    setSearchQuery(""); // Clear input after search
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">RecipeShr</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Discover</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-recipe">My Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-recipes">Saved Recipes</Link>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-3">
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-light me-2" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-primary" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
