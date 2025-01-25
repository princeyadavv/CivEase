import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full bg-gray-800 text-white">
      <header className="h-12 mx-auto py-4 bg-[#6A42C2] overflow-hidden flex justify-center items-center">
        <nav className="flex justify-between items-center">
          <ul className="flex justify-between items-center gap-4">
            <li>
              <Link to="/explore">Home</Link>
            </li>
            <li>
              <Link to="/form">About</Link>
            </li>

            <li>
              <Link to="/form2">Form2</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
