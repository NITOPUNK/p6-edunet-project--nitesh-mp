import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carosoul from '../components/Carosoul';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/discover");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
      <Carosoul />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Discover Recipes</h2>
        
        {loading ? (
          <div className="row">
            {[1, 2, 3].map((placeholder) => (
              <div className="col-md-4" key={placeholder}>
                <div className="card shadow-sm mb-4">
                  <div className="card-body" style={{ height: "400px" }}>
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="text-muted mb-0">Loading recipes...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            {recipes.map((recipe) => (
              <div className="col-md-4" key={recipe._id}>
                <div className="card shadow-sm mb-4">
                  <img 
                    src={recipe.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    className="card-img-top" 
                    alt={recipe.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                    <p className="card-text text-muted mb-2">{recipe.category}</p>
                    <p className="card-text">
                      {recipe.description.length > 100
                        ? `${recipe.description.substring(0, 100)}...`
                        : recipe.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="bi bi-eye me-1"></i> {recipe.views || 0} views
                      </small>
                      <small className="text-muted">By {recipe.createdByName}</small>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <Link to={`/view-recipe/${recipe._id}`} className="btn btn-primary w-100">
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
