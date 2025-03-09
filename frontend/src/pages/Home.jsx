import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carosoul from '../components/Carosoul';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://p6-edunet-project-nitesh-mp.onrender.com/recipe/discover");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const LoadingCard = () => (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm" aria-hidden="true">
        <div className="placeholder-glow">
          <div className="placeholder" style={{ height: "200px" }}></div>
        </div>
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
          </p>
          <div className="placeholder-glow">
            <span className="placeholder col-6"></span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Carosoul />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Discover Recipes</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row">
          {loading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            recipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe._id}>
                <div className="card shadow-sm h-100">
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
                    <p className="card-text flex-grow-1">{recipe.description}</p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <i className="bi bi-eye me-1"></i> {recipe.views || 0} views
                        </small>
                        <span className="badge bg-primary">{recipe.category}</span>
                      </div>
                      <Link 
                        to={`/view-recipe/${recipe._id}`} 
                        className="btn btn-primary w-100"
                      >
                        View Recipe
                      </Link>
                    </div>
                  </div>
                  <div className="card-footer text-muted">
                    Created by {recipe.createdByName}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
