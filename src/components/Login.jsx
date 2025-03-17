import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../axios/axios.js";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { setUser } from "./redux/slices/userSlice.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // React Hook Form for handling form validation and submission
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMessage("");

    try {
      // Sending login request to the backend
      const response = await axios.post("/user/login", data);
      const token = response.data.data.accessToken;
      // console.log("Registration Successful:", response.data);
      
      // Storing token in local storage
      localStorage.setItem("token", JSON.stringify(token));
      
      // Fetching current user data after login
      const currentUser = await axios.get("/user/user-now");
      // console.log("currentUser :",currentUser);
      
      if (currentUser?.data?.data?.user) { 
        dispatch(setUser(currentUser.data.data.user));
      }
      
      // Navigating to home page after successful login
      navigate("/");
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error Response:",error.response);

      // Extract meaningful error message from response
      const errorMessage =
        error.response?.data?.message || "Wrong Credentials";
        console.log(error); 
        
      setServerError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        {/* Login Title */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h2>

        {/* Display server error if any */}
        {serverError && (
          <p className="text-red-500 text-sm mt-2 text-center">{serverError}</p>
        )}
        
        {/* Display success message if login is successful */}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          
          {/* Password Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
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
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          
          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 font-semibold rounded-lg transition-all duration-300 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        
        {/* Redirect to Register Page */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline cursor-pointer">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
