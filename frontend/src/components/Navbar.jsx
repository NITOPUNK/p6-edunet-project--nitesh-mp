import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check both cookie and username on component mount and when cookies change
    const storedUsername = window.localStorage.getItem("username");
    if (cookies.access_token && storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername("");
    }
  }, [cookies.access_token]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  const handleLogout = () => {
    removeCookies("access_token", { 
      path: "/",
      secure: true,
      sameSite: "none"
    });
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userID");
    setUsername("");
    navigate("/login");
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
            {username && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-recipe">Create Recipe</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-recipes">My Recipes</Link>
                </li>
              </>
            )}
          </ul>

          {/* Search Bar */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by recipe , category , user"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ minWidth: "300px" }}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>

          <ul className="navbar-nav ms-3">
            {username ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">Hello, {username}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
