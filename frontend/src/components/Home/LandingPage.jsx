import React, { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useToken, useDecodedToken } from "../context/TokenContent"; // Import hooks

gsap.registerPlugin(ScrollTrigger);

const LandingPage = ({ onGetStarted }) => {
  const { token, saveToken } = useToken(); // Get the raw token and save function
  const decodedToken = useDecodedToken(); // Get decoded token data
  console.log(decodedToken);

  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    onGetStarted();

    navigate("/explore");
  };

  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 90 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="text-white py-20 px-4 md:px-6 lg:px-8 h-screen flex items-center bg-gradient-to-b from-blue-400 to-pink-200">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Empowering Citizens. Building Better Communities.
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-500">
            Report issues, provide feedback, and track resolutions—all in one
            place.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link
              to="/report"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              Report an Issue
            </Link>
            <button
              onClick={handleGetStartedClick}
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        ref={(el) => (sectionsRef.current[0] = el)}
        className="py-20 px-4 md:px-6 lg:px-8 bg-gray-100"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "📱",
                title: "Report Issues Easily",
                description:
                  "Quickly report potholes, broken streetlights, or safety concerns with just a few clicks.",
              },
              {
                icon: "⏰",
                title: "Real-Time Updates",
                description:
                  "Stay informed with instant notifications about the status of your reports and resolutions.",
              },
              {
                icon: "📊",
                title: "Transparent Tracking",
                description:
                  "Monitor how your feedback impacts your community and watch as issues get resolved.",
              },
              {
                icon: "⚠",
                title: "Priority-Based System",
                description:
                  "Urgent issues are prioritized to ensure timely resolutions where it matters most.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl"
              >
                <div className="text-blue-600 text-4xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 px-4 md:px-6 lg:px-8 bg-blue-50"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-600">
            What People Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                feedback: "This platform is a game-changer for our community.",
                name: "Aditi Sharma",
              },
              {
                feedback:
                  "I can finally report issues and see them resolved efficiently.",
                name: "Rahul Verma",
              },
              {
                feedback: "Transparent and easy to use. Highly recommended!",
                name: "Sneha Kapoor",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-left"
              >
                <p className="text-lg text-gray-700 italic">
                  "{testimonial.feedback}"
                </p>
                <p className="mt-4 font-bold text-blue-600">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-20 px-4 md:px-6 lg:px-8 bg-blue-100"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Have Questions? Contact Us
          </h2>
          <p className="text-lg mb-6">
            Reach out to us at{" "}
            <a
              href="mailto:support@civitas.com"
              className="text-blue-600 font-bold hover:underline"
            >
              support@civitas.com
            </a>{" "}
            for more information or assistance.
          </p>
          <button className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition">
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
