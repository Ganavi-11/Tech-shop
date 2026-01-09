import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import productsData from "../data/productsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Image paths
const jblImg = "/images/products/jbl660nc-1.png";
const boatImg = "/images/products/boat131-3.png";
const sonyImg = "/images/products/sonyXb910n-1.png";

const carouselImages = [jblImg, boatImg, sonyImg];

const Carousel = () => {
  const navigate = useNavigate();

  const carouselProducts = productsData.filter(product =>
    [1, 3, 7].includes(product.id)
  );

  const settings = {
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,

    // Tailwind styled dots (
    appendDots: dots => (
      <div className="absolute bottom-6 left-0 w-full z-20">
        <ul className="flex justify-center gap-1">
          {dots}
        </ul>
      </div>
    ),

    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-400 hover:bg-red-500 transition cursor-pointer" />
    ),
  };

  return (
    <div className="relative w-full bg-black">
      <Slider {...settings}>
        {carouselProducts.map((product, index) => (
          <div key={product.id}>
            {/* SLIDE WRAPPER */}
            <div className="relative min-h-[800px] flex items-center my-5">

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

              {/* CONTENT */}
              <div className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-20">

                {/* LEFT TEXT */}
                <div className="max-w-xl text-white space-y-5 text-center md:text-left">
                  <p className="text-gray-400 uppercase tracking-widest text-sm">
                    {product.title}
                  </p>

                  <h3 className="text-3xl md:text-5xl font-bold leading-tight">
                    {product.tagline}
                  </h3>

                  <div className="flex justify-center md:justify-start items-center gap-4 text-lg">
                    <span className="text-2xl font-semibold">
                      ₹{product.finalPrice}
                    </span>
                    <span className="line-through text-gray-400">
                      ₹{product.originalPrice}
                    </span>
                  </div>

                  <button className="bg-red-600 hover:bg-red-700 transition px-7 py-3 rounded font-semibold w-fit mx-auto md:mx-0">
                    Shop Now
                  </button>
                </div>

                {/* RIGHT IMAGE */}
                <div className="mt-10 md:mt-0 flex justify-center">
                  <img
                    src={carouselImages[index]}
                    alt={product.title}
                    className="w-[260px] md:w-[420px] object-contain drop-shadow-2xl cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
