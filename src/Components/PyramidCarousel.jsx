import React, { useState } from "react";
import Slider from "react-slick";
import productsData from "../data/productsData";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//  Image imports
import boat255 from "../images/products/boat255r-1.png";
import jblEndu from "../images/products/jbl-endu-1.png";
import boat131 from "../images/products/boat131-1.png";
import boat518 from "../images/products/boat518-1.png";
import jbl760 from "../images/products/jbl760nc-1.png";

const imageMap = {
  9: boat255,
  13: jblEndu,
  3: boat131,
  2: boat518,
  8: jbl760,
};

const PyramidCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  // pick only required products
  const products = productsData.filter(p =>
    [9, 13, 3, 2, 8].includes(p.id)
  );

  const settings = {
    autoplay: true,
    autoplaySpeed: 2500,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 600,
    arrows: false,
    dots: true,

    beforeChange: (_, next) => setActiveSlide(next),

    //  Tailwind styled dots wrapper
    appendDots: dots => (
      <div className="mt-10">
        <ul className="flex justify-center gap-3"> {dots} </ul>
      </div>
    ),

    // Each dot style
    customPaging: () => (
      <div className="w-2.5 h-2.5 rounded-full bg-gray-500 opacity-60 hover:opacity-100 transition" />
    ),
  };

  return (
    <div className="w-full bg-black py-20">
      <h2 className="text-center font-bold text-gray-400 text-2xl mb-16">
        Featured Products
      </h2>

      <Slider {...settings}>
        {products.map((product, index) => {
          const isActive = index === activeSlide;

          return (
            <div key={product.id} className="px-3">
              <div
                className={`transition-all duration-500 flex flex-col items-center text-center m-3
                  ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-90 opacity-40"
                  }
                `}
              >
                {/* TITLE */}
                <h3
                  className={`transition-all duration-500
                    ${
                      isActive
                        ? "text-gray-300 text-lg font-semibold"
                        : "text-gray-500 text-sm"
                    }
                  `}
                >
                  {product.title}
                </h3>

                {/* IMAGE */}
                <img
                  src={imageMap[product.id]}
                  alt={product.title}
                  className={`object-contain m-3 transition-all duration-500
                    ${
                      isActive
                        ? "h-56 drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                        : "h-40"
                    }
                  `}
                />

                {/* PRICE */}
                <p
                  className={`transition-all duration-100
                    ${
                      isActive
                        ? "text-gray-300 font-bold mt-2"
                        : "text-gray-500 text-sm mt-1"
                    }
                  `}
                >
                  ₹{product.finalPrice}
                  <span className="line-through ml-2 text-gray-500 text-xs">
                    ₹{product.originalPrice}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PyramidCarousel;
