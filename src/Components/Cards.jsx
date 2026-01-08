import React, { useState } from "react";
import productsData from "../data/productsData.js";

const categories = [
  "All",
  "Headphones",
  "Earbuds",
  "Earphones",
  "Neckbands",
];

const ProductsCards = () => {
  const [activeCategory, setActiveCategory] = useState("All");


  const filteredProducts =
    activeCategory === "All"
      ? productsData
      : productsData.filter(
        (product) => product.category === activeCategory
      );

  return (
    <section className="bg-black py-16 px-6">

      <h2 className="text-center text-white text-2xl font-bold mb-8">
        TOP PRODUCTS
      </h2>

      {/* Category Buttons */}
      <div className="flex justify-center gap-6 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-sm rounded-md transition
              ${activeCategory === cat
                ? "bg-red-600 text-white cursor-pointer"
                : "text-gray-400 hover:text-white cursor-pointer"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#111] border border-gray-700 rounded-lg p-4 flex flex-col"
          >
            {/*  product image */}
            <div className="flex justify-center mb-4">
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-40 object-contain"
              />
            </div>

            {/* product ratings */}
            <div className="flex text-red-500 text-sm mb-1">
              {"★".repeat(product.rateCount)}
            </div>

            {/* product title */}
            <h3 className="text-white font-medium text-sm">
              {product.title}
            </h3>

            {/*product info */}
            <p className="text-gray-400 text-xs mb-2">
              {product.info}
            </p>

            {/* product price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white font-semibold">
                ₹{product.finalPrice.toLocaleString()}
              </span>
              <span className="text-gray-500 line-through text-sm">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>

            {/* cart button */}
            <button className="mt-auto bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-md transition">
              Add to cart
            </button>
          </div>

          

        ))}
      </div>



    </section>
  );
};

export default ProductsCards;