import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle visibility
  const [message, setMessage] = useState(""); // To store success or error messages

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    setMessage(""); // Reset any previous message
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Account created successfully!");
        window.location.href = "/login";
      } else {
        setMessage(result?.message || "File upload failed");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-pink-200 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-half">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          SignUp
        </h2>
        {message && (
          <div className="text-center text-red-600 font-medium text-sm mb-4">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
          <div className="flex flex-row gap-4">
            <div>
              <label
                htmlFor="first_name"
                className="block text-gray-700 font-medium mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                // name="firstname"
                placeholder="Enter your first name"
                {...register("firstname", {
                  required: "First Name is required",
                })}
                className={`w-full px-4 py-2 border ${
                  errors.firstname ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              {errors.firstname && (
                <span className="text-red-500 text-sm">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-gray-700 font-medium mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                // name="lastname"
                placeholder="Enter your last name"
                {...register("lastname")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              // name="email"
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
                type={showPassword ? "text" : "password"}
                id="password"
                // name="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
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
            Sign up
          </button>
        </form>
        <p className="text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#3B6790] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
