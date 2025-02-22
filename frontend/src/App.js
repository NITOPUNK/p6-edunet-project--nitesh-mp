import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import RecipeDetails from "./pages/RecipeDetails";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import EditRecipe from "./pages/EditRecipe";
import ViewRecipe from "./pages/ViewRecipe";

const App = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Pasta", description: "Delicious homemade pasta", image: "/pasta.jpg" },
    { id: 2, title: "Pizza", description: "Cheesy and crispy pizza", image: "/pizza.jpg" },
    { id: 3, title: "Burger", description: "Juicy burger with toppings", image: "/burger.jpg" },
  ]);

  return (
    <Router>
      <Navbar recipes={recipes} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchPage recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/edit-recipe/:id" element={<EditRecipe />} />
        <Route path="/view-recipe/:id" element={<ViewRecipe />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
