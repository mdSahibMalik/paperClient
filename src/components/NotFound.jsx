import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-5">
      <div className="text-center">
        {/* Floating 404 Number */}
        <h1 className="text-[10rem] font-bold text-white animate-bounce">404</h1>
        
        {/* Animated message */}
        <p className="text-2xl md:text-3xl font-semibold text-white mt-5 animate-pulse">
          Oops! Page Not Found
        </p>

        <p className="text-white mt-3 text-lg md:text-xl">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
