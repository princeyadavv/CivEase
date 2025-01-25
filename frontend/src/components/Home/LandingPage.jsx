import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({ onGetStarted }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    onGetStarted();
    navigate("/explore");
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="  text-white py-20 px-6 h-screen flex items-center">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl text-[#3B6790] md:text-6xl font-extrabold mb-6  ">
            Empowering Citizens. Building Better Communities.
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-500">
            Report issues, provide feedback, and track resolutions—all in one
            place.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#report"
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100"
            >
              Report an Issue
            </a>
            <button
              onClick={handleGetStartedClick}
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="bg-white p-8 rounded-lg shadow-lg-custom"
              >
                <div className="text-blue-600 mb-4 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Three Simple Steps to a Better Community
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1️⃣",
                title: "Report",
                description:
                  "Describe the issue, upload photos, and pinpoint the location on a map.",
              },
              {
                step: "2️⃣",
                title: "Track",
                description:
                  "Receive updates and track the status of your report in real time.",
              },
              {
                step: "3️⃣",
                title: "Resolve",
                description:
                  "Watch as city officials take action to resolve the issue efficiently.",
              },
            ].map((step, index) => (
              <div key={index} className="p-8">
                <div className="text-blue-600 text-4xl mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <button
            onClick={handleGetStartedClick}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
