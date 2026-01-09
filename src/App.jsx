import { useState } from "react";
import "./App.css";

import Navbar from "./Components/Navbar";
import Carousel from "./Components/Carousel";
import PyramidCarousel from "./Components/PyramidCarousel";
import Products from "./Components/Products";
import Advantages from "./Components/Advantages";
import Footer from "./Components/Footer";
import AuthModal from "./Components/AuthModal";

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      {/* Main Content */}
      <Carousel />
      <PyramidCarousel />
      <Products />
      <Advantages />
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}

export default App;
