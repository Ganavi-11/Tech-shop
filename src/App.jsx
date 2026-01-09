import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import Carousel from "./Components/Carousel";
import PyramidCarousel from "./Components/PyramidCarousel";
import Products from "./Components/Products";
import Advantages from "./Components/Advantages";
import Footer from "./Components/Footer";
import AuthModal from "./Components/AuthModal";
import ProductDetails from "./Components/ProductDetails";

function Home({ onLoginClick }) {
  return (
    <>
      <Navbar onLoginClick={onLoginClick} />
      <Carousel />
      <PyramidCarousel />
      <Products />
      <Advantages />
      <Footer />
    </>
  );
}

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={<Home onLoginClick={() => setAuthOpen(true)} />}
        />

        {/* PRODUCT DETAILS PAGE */}
        <Route path="/product/:id" element={<ProductDetails onLoginClick={() => setAuthOpen(true)} />} />
      </Routes>

      {/* Auth Modal (global) */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}

export default App;
