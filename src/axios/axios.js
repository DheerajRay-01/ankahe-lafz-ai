import axios from 'axios'
export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1",
})