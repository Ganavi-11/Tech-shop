import { useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-[380px] bg-[#111] text-white rounded-lg shadow-xl p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-semibold mb-1">
            {isLogin ? "Login" : "Signup"}
          </h2>

          <p className="text-gray-400 text-sm mb-5">
            {isLogin ? (
              <>
                New to Tech-Shop?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-red-500 cursor-pointer hover:underline"
                >
                  Login
                </span>
              </>
            )}
          </p>

          {/* Form */}
          <form className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-red-500"
              />
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition py-2 rounded-md font-semibold"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 text-gray-400 text-sm">
            <div className="flex-1 h-px bg-gray-700" />
            or login with
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-[#3b5998] py-2 rounded text-sm">
              Facebook
            </button>
            <button className="flex-1 bg-[#db4437] py-2 rounded text-sm">
              Google
            </button>
            <button className="flex-1 bg-[#1da1f2] py-2 rounded text-sm">
              Twitter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
