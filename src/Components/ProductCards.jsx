import { FaStar } from "react-icons/fa";

export default function ProductCards({ product }) {
  // Safety check to avoid undefined errors
  if (!product || !product.images) return null;

  return (
    <div className="bg-[#111] rounded-lg border border-gray-800 hover:border-gray-600 transition overflow-hidden flex flex-col">
      
      {/* Image */}
      <div className="bg-[#0f0f0f] flex justify-center items-center p-6 h-[220px]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="object-contain h-full hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Ratings */}
        <div className="flex gap-1 text-red-500 text-sm mb-2">
          {Array.from({ length: product.rateCount }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-1">
          {product.title}
        </h3>

        {/* Info */}
        <p className="text-gray-400 text-xs mb-3">
          {product.info}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white font-semibold">
            ₹{product.finalPrice.toLocaleString()}
          </span>
          <span className="text-gray-500 line-through text-sm">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Button */}
        <button className="mt-auto bg-red-600 hover:bg-red-700 transition text-sm py-2 rounded-md">
          Add to cart
        </button>
      </div>
    </div>
  );
}
