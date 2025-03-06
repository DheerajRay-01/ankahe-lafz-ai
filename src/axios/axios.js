import axios from "axios";

// Create an Axios instance
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1` , // Your backend URL
  withCredentials: true, // Ensures cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in every request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
