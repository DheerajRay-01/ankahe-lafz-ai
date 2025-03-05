import ChatScreen from './components/ChatScreen';
import Login from '../src/components/Login.jsx';
import Register from '../src/components/Register.jsx';
import AuthLayout from './components/AuthLayout.jsx';
import { Route ,Routes } from 'react-router';
import { useEffect } from 'react';
import axios from './axios/axios.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './components/redux/slices/userSlice.js';
import Profile from './components/Profile.jsx';
import Saved from './components/Saved.jsx';
// import Option from './components/Option';
function App() {
const dispatch = useDispatch()
const currentUser = useSelector((state) => state.user.user);

useEffect(() => {
  // console.log(currentUser);
  
  
  if (currentUser) {
    console.log("User already exists:", currentUser);
    return;
  }
  
  const controller = new AbortController();
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
  
  if (!token) {
    console.log("No token found, skipping fetch.");
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
    }
  };

  fetchUser();

  return () => controller.abort(); // Cleanup function to abort request if unmounted
}, [currentUser, dispatch]);  


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