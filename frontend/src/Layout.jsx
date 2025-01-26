import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout() {
  const location = useLocation();

  // Determine whether to show header and footer
  const showHeaderFooter = location.pathname !== "/"; // Only hide on the landing page

  return (
    <>
      {showHeaderFooter && <Header />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;
