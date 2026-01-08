import React from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-black text-white flex items-center justify-between px-4 py-3">
      {/* Logo on the left */}
      <div className="text-3xl font-bold ">
        Tech-shop
      </div>

      {/* Icons on the right */}
      <div className="flex items-center space-x-10">
        <FiSearch className="text-white cursor-pointer" size={24} />
        <FiShoppingCart className="text-white cursor-pointer" size={24} />
        <FiUser className="text-white cursor-pointer" size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
