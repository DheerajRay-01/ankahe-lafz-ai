import axios from "axios";

export default axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`, // ✅ Use environment variable
  withCredentials: true,
});
