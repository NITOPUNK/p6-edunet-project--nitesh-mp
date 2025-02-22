import React from "react";

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Recipe Hub</h2>
      <p className="lead text-center">
        Welcome to <strong>Recipe Hub</strong>, your go-to platform for sharing and discovering amazing recipes from around the world.
      </p>
      <p className="text-center text-muted">
        <em>Recipe Hub is an internship hobby project built with a passion for food and technology.</em>
      </p>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Our Mission</h4>
          <p>
            Our goal is to connect food lovers by providing a platform where they can share their favorite recipes, discover new ones, and collaborate in real-time.
          </p>
        </div>
        <div className="col-md-6">
          <h4>Why Choose Us?</h4>
          <ul>
            <li>Easy recipe sharing and searching</li>
            <li>Real-time collaboration features</li>
            <li>Save and organize your favorite recipes</li>
            <li>Engage with a food-loving community</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-muted">
          <em>
            This project was developed as part of an internship to explore web development, user interaction, and database management while sharing the love for food!
          </em>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
