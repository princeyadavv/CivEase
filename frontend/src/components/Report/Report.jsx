import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const Report = () => {
  // const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    fullName: "",
    phone: "",
    email: "",
    description: "",
    file: null,
    location: "",
    lat: "",
    long: "",
  });

  const [descriptionRows, setDescriptionRows] = useState(2);
  const [locationError, setLocationError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "description") {
        const lineCount = value.split("\n").length;
        setDescriptionRows(lineCount + 1);
      }
    }
  };
  async function getLocationFromCoordinates(lat, lng) {
    const baseUrl = "https://api.opencagedata.com/geocode/v1/json"; // Added const
    const apiKey = "4a3c843eee9845cda6677dd115aedc33"; // Added const
    const url = `${baseUrl}?q=${lat}+${lng}&key=${apiKey}&no_annotations=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch location data");
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return data.results[0];
      }
      return "Unknown location"; // Handle case where no results are found
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Error fetching location"; // Handle API errors
    }
  }

  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setLocationError(""); // Clear previous errors

          // Fetch and use location from coordinates
          const locationDescription = await getLocationFromCoordinates(
            latitude,
            longitude
          );

          console.log(locationDescription);

          setFormData((prev) => ({
            ...prev,
            lat: latitude,
            long: longitude,
          }));
          // Assuming setFormData and setLocationError are React state setters
          setFormData((prev) => ({
            ...prev,
            location: `${locationDescription.formatted}`,
          }));
        },
        () => {
          setLocationError("Unable to fetch location. Please try again.");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  const handleShowToast = () => {
    setShowToast(true);
    gsap.fromTo(
      ".toast",
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    setTimeout(() => {
      gsap.to(".toast", {
        x: 300,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => setShowToast(false),
      });
    }, 5000);
  };

  const handleReport = async () => {
    console.log(formData);

    if (formData.file) {
      console.log("File attached:", formData.file.name);
    }

    handleShowToast();
    // navigate("/explore");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-pink-200 p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto relative">
        {/* Toast Notification */}
        {showToast && (
          <div className="toast fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
            Report sent successfully!
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Submit Your Report
        </h2>

        {/* Report Type Dropdown */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Report Type
          </label>
          <select
            name="seva"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          >
            <option>Mahakumbh Seva</option>
            <option>Prashadam ki rashi</option>
            <option>Other Seva 2</option>
          </select>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <div className="relative">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg w-full pl-12"
            />
            <span className="absolute left-3 top-3 text-gray-500">+91</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="date"
            name="dateOfBirth"
            required
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* Dynamic Description Field */}
        <div className="mb-6">
          <textarea
            name="description"
            placeholder="Report Description"
            required
            value={formData.description}
            onChange={handleChange}
            rows={descriptionRows}
            className="p-3 border border-gray-300 rounded-lg w-full resize-none"
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Attach a File (Image of Problem)
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        {/* Location Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Location (Optional)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="location"
              placeholder="Address"
              onChange={handleChange}
              value={formData.location}
              className="p-3 border border-gray-300 rounded-lg w-full mr-4"
            />
            <input
              type="text"
              name="address"
              placeholder="Location"
              readOnly
              value={`${formData.longitude},${formData.longitude}`}
              className="p-3 border border-gray-300 rounded-lg w-full mr-4"
            />
            <button
              onClick={handleGetLocation}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-700"
            >
              Get Location
            </button>
          </div>
          {locationError && (
            <p className="text-red-500 mt-2">{locationError}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center mt-8">
          <p className="text-sm text-gray-600">
            Thank you for submitting the report. It will be processed in the
            shortest possible time.
          </p>
          <button
            onClick={handleReport}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
