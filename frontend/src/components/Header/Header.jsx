import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      Header
      <Link to="/form">to form</Link>
      <Link to="/Form2">to form2</Link>
    </div>
  );
};

export default Header;
