import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#1F509A] text-gray-100 py-8  bottom-w-full">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-white text-lg font-semibold">Issue Tracker</h2>
            <p className="mt-2 text-sm">
              Empowering teams to solve problems efficiently and
              collaboratively.
            </p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-2 space-x-4">
              <a href="#" className="hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} CivEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
