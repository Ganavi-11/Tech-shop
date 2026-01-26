import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import Slider from "react-slick";
import productsData from "../data/productsData";
import reviewsData from "../data/reviewsData";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import Advantages from "./Advantages";
import Footer from "./Footer";
import { useCart } from "./CartContext";

export default function ProductDetails({ onLoginClick }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.id === Number(id));

  const [activeImage, setActiveImage] = useState(product?.images?.[0]);
  const [activeTab, setActiveTab] = useState("specs");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // RELATED PRODUCTS BY CATEGORY
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 8);
  }, [product]);

  if (!product) {
    return (
      <div className="text-white p-10 text-center">Loading...</div>
    );
  }

  // Slick carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(relatedProducts.length, 4),
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <Navbar onLoginClick={onLoginClick} />
      <section className="bg-[#0b0b0b] min-h-screen text-white px-4 py-12  mt-15">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* ================= TOP SECTION ================= */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

            {/* THUMBNAILS */}
            <div className="
    flex flex-row 
    lg:flex-col 
    gap-4 
    w-full 
    md:w-auto 
    md:mx-auto 
    lg:mx-0
    justify-center
    overflow-x-auto
  ">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`border rounded-lg p-2 bg-[#0f0f0f] transition
          ${activeImage === img
                      ? "border-white"
                      : "border-gray-700 hover:border-gray-500"
                    }`}
                >
                  <img
                    src={img}
                    alt="thumb"
                    className="w-20 h-20 object-contain"
                  />
                </button>
              ))}
            </div>



            {/* MAIN IMAGE */}
            <div className="bg-gradient-to-br from-[#111] to-[#050505] rounded-xl p-6 flex-1 flex items-center justify-center shadow-xl">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full max-h-[520px] object-contain"
              />
            </div>

            {/* RIGHT INFO PANEL */}
            <div className="space-y-6 flex-1">
              <div>
                <h1 className="text-2xl font-semibold text-gray-200">
                  {product.title}
                </h1>
                <p className="text-sm text-gray-400 mt-1">{product.info}</p>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-3">
                <div className="flex text-red-500">
                  {Array.from({ length: product.rateCount }).map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  | {product.ratings} Ratings
                </span>
              </div>

              <hr className="border-gray-800" />

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-white">
                    ₹{product.finalPrice.toLocaleString()}
                  </span>
                  <span className="line-through text-gray-500">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-500 text-sm font-medium">
                    You save ₹
                    {(product.originalPrice - product.finalPrice).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">(Inclusive of all taxes)</p>
              </div>

              <div className="inline-flex items-center gap-2 bg-green-700/20 text-white-400 px-3 py-1 rounded text-xs w-fit">
                ✔ In Stock
              </div>

              <hr className="border-gray-800" />

              {/* Offers */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-3">
                  Offers and Discounts
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-gray-700 rounded-md p-3 text-xs text-gray-300">
                    No Cost EMI on Credit Card
                  </div>
                  <div className="border border-gray-700 rounded-md p-3 text-xs text-gray-300">
                    Pay Later & Avail Cashback
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  setIsAdded(true);
                  setTimeout(() => navigate("/cart"), 1500);
                }}
                className={`w-full transition py-3 rounded-md font-medium ${isAdded ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {isAdded ? 'Added' : 'Add to cart'}
              </button>
            </div>
          </div>

          {/* ================= TABS ================= */}
          <div className="flex justify-center gap-10 my-10 text-m flex-wrap">
            <TabButton
              label="Specifications"
              active={activeTab === "specs"}
              onClick={() => setActiveTab("specs")}
            />
            <TabButton
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <TabButton
              label="Reviews"
              active={activeTab === "reviews"}
              onClick={() => setActiveTab("reviews")}
            />
          </div>

          {/* TAB CONTENT */}
          <div className="flex justify-center pt-3">
            <div className="w-full max-w-4xl">
              {activeTab === "specs" && (
                <div className="grid grid-cols-1 gap-y-5 text-m bg-[#111] p-6 rounded-lg">
                  <Spec label="Brand" value={product.brand} />
                  <Spec label="Model" value={product.title} />
                  <Spec label="Generic Name" value={product.category} />
                  <Spec label="Headphone Type" value={product.type} />
                  <Spec label="Connectivity" value={product.connectivity} />
                  <Spec label="Microphone" value="Yes" />
                </div>
              )}
              {activeTab === "overview" && (
                <div className="text-gray-300 leading-relaxed bg-[#111] p-6 rounded-lg">
                  <p>
                    {product.info} delivers premium sound quality with modern
                    design and superior comfort. Built using high-quality materials
                    for long-lasting durability and immersive listening experience.
                  </p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  {reviewsData.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{review.name}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex text-red-500 text-sm my-1">
                        {Array.from({ length: review.rateCount }).map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm">{review.review}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RELATED PRODUCTS CAROUSEL ================= */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 max-w-7xl mx-auto">
              <h2 className="text-xl font-semibold text-center mb-16 text-gray-200">
                Related Products
              </h2>
              <Slider {...sliderSettings} className="relative mb-3">
                {relatedProducts.map((item) => (
                  <div key={item.id} className="px-2">
                    <RelatedCard
                      product={item}
                      onClick={() => navigate(`/product-details/${item.id}`)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </section>
      <Advantages />
      <Footer />
    </>
  );
}

/* ================= COMPONENTS ================= */
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-t-md font-medium transition-all ${active
        ? "bg-red-600 text-white border-t border-l border-r border-red-600"
        : "text-gray-400 hover:text-white"
        }`}
    >
      {label}
    </button>
  );
}

function Spec({ label, value }) {
  return (
    <div className="flex gap-6">
      <span className="w-44 shrink-0 text-gray-500">{label}</span>
      <span className="text-gray-300">{value}</span>
    </div>
  );
}

function RelatedCard({ product, onClick }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-[#111] border border-gray-800 rounded-lg p-4 hover:border-red-600 hover:shadow-lg transition"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="h-40 mx-auto object-contain mb-4"
      />
      <div className="flex justify-center text-red-500 text-sm mb-1">
        {Array.from({ length: product.rateCount }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <h3 className="text-sm text-center font-semibold text-gray-200">
        {product.title}
      </h3>
      <p className="text-xs text-center text-gray-400 mb-2">{product.info}</p>
      <div className="text-center">
        <span className="font-semibold text-white">
          ₹{product.finalPrice.toLocaleString()}
        </span>{" "}
        <span className="text-xs line-through text-gray-500">
          ₹{product.originalPrice.toLocaleString()}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
          navigate("/cart");
        }}
        className="w-full mt-3 bg-red-600 hover:bg-red-700 text-xs py-2 rounded"
      >
        Add to cart
      </button>
    </div>
  );
}
