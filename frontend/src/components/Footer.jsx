import React from "react";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <img 
                src="/android-chrome-192x192.png" 
                alt="RecipeShr Logo" 
                height="30" 
                className="me-2"
              />
              <h5 className="mb-0">RecipeShr</h5>
            </div>
            <p className="mb-2">&copy; {new Date().getFullYear()} RecipeShr. All Rights Reserved.</p>
            <div className="mb-0">
              <Link to="/about" className="text-light text-decoration-none mx-2">About Us</Link>
              <span className="text-light">|</span>
              <Link to="/contact" className="text-light text-decoration-none mx-2">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
