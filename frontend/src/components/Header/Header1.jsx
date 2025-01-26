import React from "react";
import { FaSignInAlt } from "react-icons/fa";
// import { BookOpenIcon } from "@heroicons/react/outline";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md"></div>
        <span className="text-lg font-semibold text-gray-900">RoadReport</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-6 text-gray-600">
        <a href="#" className="hover:text-gray-900">
          Home
        </a>
        <a href="#" className="hover:text-gray-900">
          Post Issue
        </a>
        <a href="#" className="text-blue-600 border-b-2 border-blue-500 pb-1">
          Feed
        </a>
      </nav>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
          Sign Up
        </button>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <FaSignInAlt className="mr-2" />
          Sign In
        </button>
      </div>

      {/* Made with Visily */}
      <div className="absolute bottom-0 left-4 text-sm text-gray-500">
        Made with <span className="text-blue-600 font-semibold">Visily</span>
      </div>
    </header>
  );
};

export default Header;
