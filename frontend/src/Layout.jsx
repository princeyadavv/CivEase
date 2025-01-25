import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout({ showHeaderFooter }) {
  return (
    <>
      {showHeaderFooter && <Header />}
      <Outlet />
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;
