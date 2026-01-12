import { useState } from "react";
import productsData from "../data/productsData";
import ProductCards from "./ProductCards"; 

const categories = [
  "All",
  "Headphones",
  "Earbuds",
  "Earphones",
  "Neckbands",
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? productsData
      : productsData.filter(
          (product) => product.category === activeCategory
        );

  return (
    <section className="bg-[#0b0b0b] min-h-screen text-white px-6 py-12">
      {/* Title */}
      <h2 className="text-center text-2xl font-bold my-10 text-gray-400">
        Top Products
      </h2>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-md text-sm transition text-gray-400
              ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCards key={product.id} product={product} />
        ))}

        {/* last card */}
        <div className="cursor-pointer bg-[#111] rounded-lg border border-gray-800 hover:border-gray-600 transition overflow-hidden flex flex-col justify-center items-center">
          <div className="text-center text-start">
            <p className="text-gray-400  text-2xl">Browse All</p>
            <p className="text-gray-400 text-2xl">Products →</p>
          </div>
        </div>
      </div>
    </section>
  );
}
