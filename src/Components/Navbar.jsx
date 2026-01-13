import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { useCart } from "./CartContext";
import productsData from "../data/productsData";

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);
  const userRef = useRef(null);

  //  Closing search when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = productsData.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const product = productsData.find(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (product) {
        navigate(`/product/${product.id}`);
        setSearchOpen(false);
        setSearchQuery("");
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] text-white px-5 py-5">
      
      {/* Navbar Row */}
      <div className="flex items-center justify-between relative">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-bold whitespace-nowrap cursor-pointer"
        >
          Tech-shop
        </div>

        {/* Desktop Center Search  */}
        {searchOpen && (
          <div
            ref={searchRef}
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-[1000px] max-w-[45vw]"
          >
            <div className="flex w-full flex-col bg-[#141414] border border-gray-700 rounded-md overflow-hidden">
              <div className="flex items-center">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="px-3 text-gray-400 hover:text-white"
                >
                  <FiX size={18} />
                </button>
              </div>
              {filteredProducts.length > 0 && (
                <div className="max-h-60 overflow-y-auto border-t border-gray-600">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                    >
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Icons */}
        <div className="flex items-center space-x-6 md:space-x-12">

          {/*Search Icon */}
          <div className="relative group">
            <FiSearch
              onClick={() => setSearchOpen(true)}
              className="cursor-pointer"
              size={22}
            />

            {/* Tooltip */}
            <div className="absolute right-1 w-16 bg-[#141414] border border-gray-700 rounded-md p-1.5 opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p className="text-xs text-gray-300 text-center">Search</p>
            </div>
          </div>

          {/* Cart */}
          <div className="relative group">
            <FiShoppingCart
              onClick={() => navigate('/cart')}
              className="cursor-pointer"
              size={22}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.qty, 0)}
              </span>
            )}

            <div className="absolute right-0 mt-1 w-16  bg-[#141414] border border-gray-700 rounded-md p-1  opacity-0 invisible
                            group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p className="text-xs text-gray-300 text-center">Cart</p>

            </div>
          </div>

          {/*  User */}
          <div className="relative" ref={userRef}>
            <FiUser
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="cursor-pointer"
              size={22}
            />

            {userMenuOpen && (
              <div className="absolute right-0 mt-4 w-72 bg-[#141414] border border-gray-700 rounded-md p-4">
                <p className="font-semibold text-sm mb-1">Hello!</p>
                <p className="text-gray-400 text-sm mb-3">
                  Access account and manage orders
                </p>

                <button
                  onClick={() => {
                    onLoginClick();
                    setUserMenuOpen(false);
                  }}
                  className="w-full border border-gray-600 hover:border-red-500 text-sm py-2 rounded mb-2"
                >
                  Login / Signup
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Please Login
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  Mobile Search */}
      {searchOpen && (
        <div ref={searchRef} className="md:hidden mt-3 px-1">
          <div className="flex flex-col bg-[#141414] border border-gray-700 rounded-md overflow-hidden">
            <div className="flex items-center">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="px-3 text-gray-400 hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>
            {filteredProducts.length > 0 && (
              <div className="max-h-60 overflow-y-auto border-t border-gray-600">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                  >
                    {product.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
