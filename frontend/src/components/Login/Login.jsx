import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import icons from react-icons
import { useToken } from "../context/TokenContent"; // Adjust the path

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility
  const [error, setError] = useState("");
  const { saveToken } = useToken(); // Use the context
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        saveToken(result.token); // Save token using the context

        console.log("Logged in successfully");
        navigate("/explore");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-pink-200 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && (
          <div className="text-center text-red-600 font-medium text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Please enter a valid email",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2.5 text-gray-600"
              >
                {showPassword ? (
                  <HiEye className="h-5 w-5" />
                ) : (
                  <HiEyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#3B6790] hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#3B6790] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
