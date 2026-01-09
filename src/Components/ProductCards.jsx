import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCards({ product }) {
  const navigate = useNavigate();

  if (!product || !product.images) return null;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer bg-[#111] rounded-lg border border-gray-800 hover:border-gray-600 transition overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="bg-[#0f0f0f] flex justify-center items-center p-6 h-[220px]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="object-contain h-full hover:scale-105 transition"
        />
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col flex-grow mx-5">
        <div className="flex gap-1 text-red-500 text-sm mb-2">
          {Array.from({ length: product.rateCount }).map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <h3 className="font-bold text-xl mb-2 text-gray-400">
          {product.title}
        </h3>

        <p className="text-gray-400 text-xs mb-3">
          {product.info}
        </p>

        <hr className="text-gray-400 my-2" />

        <div className="flex items-center gap-2 mb-4">
          <span className="text-white font-bold text-xl">
            ₹{product.finalPrice.toLocaleString()}
          </span>
          <span className="text-gray-500 line-through text-sm">
            ₹{product.originalPrice.toLocaleString()}
          </span>
        </div>

        <button className="mt-auto bg-red-600 hover:bg-red-700 transition py-2 rounded-md">
          Add to cart
        </button>
      </div>
    </div>
  );
}
