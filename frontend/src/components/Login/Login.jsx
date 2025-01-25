import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import icons from react-icons

export default function Login() {
  // for show and hide password
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility

  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
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
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"} // Change type based on state
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {/* Eye Icon to toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 text-gray-600"
              >
                {showPassword ? (
                  <HiEye className="h-5 w-5" />
                ) : (
                  <HiEyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
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
