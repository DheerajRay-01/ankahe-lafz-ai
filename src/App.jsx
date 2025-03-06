import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import axios from './axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './components/redux/slices/userSlice.js';
import ClipLoader from 'react-spinners/ClipLoader'; // Import the loader
import ChatScreen from './components/ChatScreen';
import Login from '../src/components/Login.jsx';
import Register from '../src/components/Register.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import Profile from './components/Profile.jsx';
import Saved from './components/Saved.jsx';

function App() {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    if (currentUser) {
      console.log("User already exists:", currentUser);
      setIsFetched(true);
      return;
    }

    const controller = new AbortController();
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

    if (!token) {
      console.log("No token found, skipping fetch.");
      setIsFetched(true);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("/user/user-now");
        dispatch(setUser(response.data.data.user));
        console.log("Fetched currentUser:", response.data.data.user);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching user:", error);
        }
      } finally {
        setIsFetched(true); // Mark as fetched after request completes
      }
    };

    fetchUser();

    return () => controller.abort();
  }, [currentUser, dispatch]);

  // Modern Loader UI
  if (!isFetched) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <ClipLoader color="#ffffff" size={80} />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route element={<AuthLayout auth={true} />}>
          <Route path="/" element={<ChatScreen />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved" element={<Saved />} />
        </Route>

        {/* Public Routes */}
        <Route element={<AuthLayout auth={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
