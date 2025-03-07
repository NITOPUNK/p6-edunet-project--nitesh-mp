import React from "react";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <p className="mb-1">&copy; {new Date().getFullYear()} Recipeshr. All Rights Reserved.</p>
      <p className="mb-0">
        <Link to="/about" className="text-light mx-2">About Us</Link> | 
        <Link to="/contact" className="text-light mx-2">Contact us</Link> | 
      </p>
    </footer>
  );
};

export default Footer;
