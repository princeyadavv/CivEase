import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useToken } from "../context/TokenContent"; // Adjust this path if necessary

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useToken(); // Access the token from TokenContext
  const navigate = useNavigate();

  // For checking token directly in localStorage (fallback for bankai)
  const localToken = localStorage.getItem("bankai");
  const isLoggedIn = !!(token || localToken);

  // Extract user name or set default
  const userName = "User"; // Placeholder: replace if `useToken` provides user data

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    // Remove token from storage/context and redirect
    localStorage.removeItem("bankai"); // Remove token
    // You may clear context state if applicable
    navigate("/"); // Redirect to login
  };

  return (
    <div className="w-full bg-[#1F509A] text-white fixed z-50">
      <header className="py-4 px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CivEase
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/explore" className="hover:text-gray-200 transition">
            Explore
          </Link>
          <Link to="/report" className="hover:text-gray-200 transition">
            Report
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/fileupload" className="hover:text-gray-200 transition">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          {menuOpen ? (
            <X
              size={28}
              onClick={toggleMenu}
              className="cursor-pointer hover:text-gray-300"
            />
          ) : (
            <Menu
              size={28}
              onClick={toggleMenu}
              className="cursor-pointer hover:text-gray-300"
            />
          )}
        </div>
      </header>

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-blue-500 transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 shadow-lg`}
      >
        <div className="flex justify-end p-4">
          <X
            size={28}
            onClick={toggleMenu}
            className="cursor-pointer hover:text-blue-300"
          />
        </div>
        <nav className="flex flex-col items-center gap-6 mt-10">
          <Link
            to="/explore"
            onClick={toggleMenu}
            className="text-lg hover:text-blue-300 transition"
          >
            Explore
          </Link>
          <Link
            to="/report"
            onClick={toggleMenu}
            className="text-lg hover:text-blue-300 transition"
          >
            Report
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={toggleMenu}
                className="text-lg hover:text-blue-300 transition"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-lg text-red-400 hover:text-red-500 transition pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="text-lg hover:text-blue-300 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={toggleMenu}
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
