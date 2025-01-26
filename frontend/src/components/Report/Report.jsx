import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useToken } from "../context/TokenContent"; // Import hooks

const Report = () => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [descriptionRows, setDescriptionRows] = useState(2);
  const [locationError, setLocationError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    description: "",
    file: null,
    location: "",
    lat: "",
    long: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData((prev) => ({
        ...prev,
        file: files[0], // Properly store the file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "description") {
        setDescriptionRows(value.split("\n").length + 1);
      }
    }
  };

  async function getLocationFromCoordinates(lat, lng) {
    const apiKey = "4a3c843eee9845cda6677dd115aedc33";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}&no_annotations=1`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch location data");
      const data = await response.json();
      return data.results?.[0]?.formatted || "Unknown location";
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Error fetching location";
    }
  }

  const handleGetLocation = async (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationDescription = await getLocationFromCoordinates(
            latitude,
            longitude
          );

          setFormData((prev) => ({
            ...prev,
            lat: latitude,
            long: longitude,
            location: locationDescription,
          }));
          setLocationError("");
        },
        () => setLocationError("Unable to fetch location. Please try again.")
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
      { x: 0, opacity: 1, duration: 0.5 }
    );

    setTimeout(() => {
      gsap.to(".toast", {
        x: 300,
        opacity: 0,
        duration: 0.5,
        onComplete: () => setShowToast(false),
      });
    }, 5000);
  };

  const handleReport = async (e) => {
    e.preventDefault();
    setMessage("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      console.log(token);
      const response = await fetch("http://localhost:5000/issue/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Only include auth header
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Report submitted successfully!");
        navigate("/explore");
      } else {
        setMessage(result?.message || "Report submission failed");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }

    handleShowToast();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-pink-200 p-8 pt-24">
      <form
        onSubmit={handleReport}
        className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto relative"
        encType="multipart/form-data"
      >
        {showToast && (
          <div className="toast fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg">
            Report sent successfully!
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Submit Your Report
        </h2>
        {message && (
          <div className="text-center text-red-600 font-medium text-sm mb-4">
            {message}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Report Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg"
          >
            <option value="">Select Issue type</option>
            <option>Emergency </option>
            <option>Road and Infrastructure </option>
            <option>Public Safety </option>
            <option>Miscellaneous</option>
            <option>Environmental Issues </option>
            <option>Health and Sanitation </option>
            <option>Community and Civic </option>
            <option>Utility-Related Issues </option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg w-full"
          />
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

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Attach a File (Image of Problem)
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Location (Optional)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              name="location"
              placeholder="Address"
              value={formData.location}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-lg w-full mr-4"
            />
            <button
              onClick={handleGetLocation}
              className="bg-blue-500 text-white px-4 py-3 rounded-lg"
            >
              Get Location
            </button>
          </div>
          {locationError && (
            <p className="text-red-500 mt-2">{locationError}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Report;
