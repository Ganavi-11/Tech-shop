import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = ({ onLoginClick }) => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // PRICE CALCULATIONS
  const originalPrice = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.qty,
    0
  );

  const finalPrice = cartItems.reduce(
    (sum, item) => sum + item.finalPrice * item.qty,
    0
  );

  const discount = originalPrice - finalPrice;

  /* ================= EMPTY CART ================= */
  if (cartItems.length === 0) {
    return (
      <>
        <Navbar onLoginClick={onLoginClick} />
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">

          <div className="border-2 border-red-600 rounded-full p-14 mb-5">
            <FaShoppingCart className="text-red-600 text-9xl" />
          </div>

          <h1 className="text-4xl font-bold text-gray-200">
            Your Cart is Empty
          </h1>

          <button
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 my-5 rounded text-m font-medium"
          >
            Start Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  /* ================= CART WITH ITEMS ================= */
  return (
    <>
      <Navbar onLoginClick={onLoginClick} />
      <div className="min-h-screen bg-[#0b0b0b] text-white px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ================= LEFT : CART ITEMS ================= */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="
               flex flex-col sm:flex-row
                  sm:items-center
                  gap-4 sm:gap-8
                     bg-[#111] border border-gray-800 rounded-lg p-3
                     "
              >
                {/* IMAGE */}
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain mx-auto sm:mx-0"
                />

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-xl font-medium text-gray-200">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-1 sm:mt-2">
                    <span className="text-base sm:text-lg font-semibold">
                      ₹{item.finalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-gray-400">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      disabled={item.qty === 1}
                      className="px-3 py-1 border border-gray-700 rounded disabled:opacity-40"
                    >
                      -
                    </button>

                    <span className="text-red-500 font-medium">{item.qty}</span>

                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      disabled={item.qty === 5}
                      className="px-3 py-1 border border-gray-700 rounded disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-end sm:self-auto text-red-500"
                >
                  <FaTrash size={20} />
                </button>
              </div>

            ))}
          </div>

          {/* ================= RIGHT : ORDER SUMMARY ================= */}
          <div className="bg-[#111] border border-gray-800 rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold mb-6">
              Order Summary ({cartItems.length} items)
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Original Price</span>
                <span>₹{originalPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>-₹{discount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Delivery</span>
                <span className="text-green-500">Free</span>
              </div>

              <hr className="border-gray-800 my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total Price</span>
                <span>₹{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded font-medium">
              Checkout
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-3 border border-gray-700 hover:border-gray-500 py-2 rounded text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
