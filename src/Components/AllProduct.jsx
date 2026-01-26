import React, { useEffect, useMemo, useState } from "react";
import productsData from "../data/productsData";
import ProductCards from "./ProductCards";
import Navbar from "./Navbar";
import Advantages from "./Advantages";
import Footer from "./Footer";
import { FiFilter } from "react-icons/fi";

const brands = ["JBL", "boAt", "Sony"];
const categories = ["Headphones", "Earbuds", "Earphones", "Neckbands"];

export default function AllProduct({ onLoginClick }) {
  const [sortBy, setSortBy] = useState("latest");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState(20000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---------------- HANDLERS ----------------
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSortBy("latest");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPrice(20000);
  };

  // ---------------- FILTER LOGIC ----------------
  const filteredProducts = useMemo(() => {
    let data = [...productsData];

    if (selectedBrands.length) {
      data = data.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length) {
      data = data.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    data = data.filter((p) => p.finalPrice <= price);

    if (sortBy === "low") {
      data.sort((a, b) => a.finalPrice - b.finalPrice);
    }
    if (sortBy === "high") {
      data.sort((a, b) => b.finalPrice - a.finalPrice);
    }
    if (sortBy === "rating") {
      data.sort((a, b) => b.rateCount - a.rateCount);
    }

    return data;
  }, [sortBy, selectedBrands, selectedCategories, price]);

  return (
    <>
      <Navbar onLoginClick={onLoginClick} />

      <section className="bg-[#0b0b0b] min-h-screen text-white px-4 md:px-6 py-12 pt-24">
        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded text-sm"
          >
            <FiFilter />
            Filters
          </button>
        </div>

        <div className="flex gap-6">
          {/* ---------------- SIDEBAR ---------------- */}
          <aside
            className={`fixed md:static z-50 top-0 left-0 h-full md:h-fit w-[280px] bg-[#0f0f0f] border-r border-gray-800 md:border md:rounded-lg p-4 overflow-y-auto transition-transform duration-300
            ${
              mobileFilterOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            {/* Mobile Close */}
            <div className="md:hidden flex justify-end mb-3">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-gray-400 text-sm"
              >
                Close ✕
              </button>
            </div>

            {/* Clear */}
            <button
              onClick={clearFilters}
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-semibold mb-6"
            >
              Clear Filters
            </button>

            {/* SORT BY */}
            <div className="mb-6">
              <h3 className="text-gray-400 font-semibold mb-3">
                Sort By
              </h3>

              {[
                { label: "Latest", value: "latest" },
                { label: "Featured", value: "featured" },
                { label: "Top Rated", value: "rating" },
                { label: "Price (Lowest First)", value: "low" },
                { label: "Price (Highest First)", value: "high" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-2 text-sm mb-2 cursor-pointer text-gray-300"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={item.value}
                    checked={sortBy === item.value}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <hr className="border-gray-800 mb-5" />

            {/* FILTER BY */}
            <h3 className="text-gray-400 font-semibold mb-3">
              Filter By
            </h3>

            {/* BRANDS */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Brands</p>
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-sm mb-2 cursor-pointer text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>

            {/* CATEGORY */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Category</p>
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm mb-2 cursor-pointer text-gray-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* PRICE */}
            <div>
              <p className="text-sm font-semibold mb-2">Price</p>
              <input
                type="range"
                min="500"
                max="20000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full accent-red-600"
              />
              <p className="text-xs text-gray-400 mt-2">
                Up to ₹{price}
              </p>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {mobileFilterOpen && (
            <div
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
          )}

          {/* ---------------- PRODUCTS GRID ---------------- */}
          <div className="flex-1 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.length ? (
              filteredProducts.map((product) => (
                <ProductCards key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </div>
      </section>

      <Advantages />
      <Footer />
    </>
  );
}
