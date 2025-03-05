import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axios/axios.js";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/slices/userSlice.js";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");

    try {
      // Register the user
      const response = await axios.post("/user/register", data);
      
      // Extract email from response
      const email = response.data?.data?.email;
      if (!email) {
        throw new Error("Error while registering: Email not found in response.");
      }

      // Log in the user after successful registration
      const { password } = data;
      const loggedIn = await axios.post("/user/login", { email, password });
      
      // Store token in local storage
      const token = loggedIn.data.data.accessToken;
      localStorage.setItem("token", JSON.stringify(token));

      // Fetch and set current user details
      const currentUser = await axios.get("/user/user-now");
      if (currentUser?.data?.data?.user) {
        dispatch(setUser(currentUser.data.data.user));
      }

      // Redirect user to home page
      navigate("/");
    } catch (error) {
      console.error("Error Response:", error);
      
      // Display error message
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setServerError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Register</h2>

        {/* Display error or success message */}
        {serverError && <p className="text-red-500 text-sm mt-2 text-center">{serverError}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("fullname", { required: "Name is required" })}
              placeholder="Enter your name"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>}
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Redirect to Login Page */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline cursor-pointer">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;