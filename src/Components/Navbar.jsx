import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi";

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  //  Closing search when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
            <div className="flex w-full items-center bg-[#141414] border border-gray-700 rounded-md overflow-hidden">
              <input
                autoFocus
                type="text"
                placeholder="Search products..."
                className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="px-3 text-gray-400 hover:text-white"
              >
                <FiX size={18} />
              </button>
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

            <div className="absolute right-0 mt-4 w-18  bg-[#141414] border border-gray-700 rounded-md p-1  opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p className="font-semibold text-sm mb-1 text-center">Cart</p>
              
            </div>
          </div>

          {/*  User */}
          <div className="relative group">
            <FiUser className="cursor-pointer" size={22} />

            <div className="absolute right-0 mt-4 w-72 bg-[#141414] border border-gray-700 rounded-md p-4 opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <p className="font-semibold text-sm mb-1">Hello!</p>
              <p className="text-gray-400 text-sm mb-3">
                Access account and manage orders
              </p>

              <button
                onClick={onLoginClick}
                className="w-full border border-gray-600 hover:border-red-500 text-sm py-2 rounded mb-2"
              >
                Login / Signup
              </button>

              <p className="text-xs text-gray-500 text-center">
                Please Login
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*  Mobile Search */}
      {searchOpen && (
        <div ref={searchRef} className="md:hidden mt-3 px-1">
          <div className="flex items-center bg-[#141414] border border-gray-700 rounded-md overflow-hidden">
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="px-3 text-gray-400 hover:text-white"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
