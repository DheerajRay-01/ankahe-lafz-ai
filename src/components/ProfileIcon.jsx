import {  useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser } from "./redux/slices/userSlice";
import axios from "../axios/axios";

const ProfileIcon = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user);
    const [isOpen , setIsOpen] = useState(false)


    const handleOpen = () =>{
      setIsOpen(!isOpen)
    }

    // const handleLogout = async () => {
    //     try {
    //         const logoutUser = await axios.post("/user/logout");
    //         localStorage.removeItem("token"); 
    //         dispatch(deleteUser());
    //         navigate("/login");
    //         console.log("logoutUser:", logoutUser);
            
    //     } catch (error) {
    //         console.error("Error in Logout:", error);
    //     }
    // };


    return(
        <>
        <div className="profile flex flex-col">
        <div 
    className="w-12 h-12 flex items-center justify-center 
               rounded-full fixed z-10 top-4 right-4 
               bg-gradient-to-r from-purple-500 to-indigo-600 
               text-white font-bold shadow-lg 
               hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
    onClick={handleOpen}
>
    {user?.fullname ? (
        <span className="text-2xl">{user.fullname.charAt(0).toUpperCase()}</span>
    ) : (
        <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"  // Ensure the correct path
            alt="ProfileIcon"
            className="w-full h-full object-cover rounded-full border-2 border-white shadow-sm"
        />
    )}
</div>


      { isOpen &&
         <div
         className={`absolute right-4 top-20 z-10 w-40 bg-white text-gray-900 rounded-xl 
                     shadow-xl border border-gray-200 overflow-hidden transition-all 
                     duration-300 transform ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
     >
         <ul className="flex flex-col py-2">
             <li 
                 className="cursor-pointer px-5 py-2 hover:bg-gray-100 transition-all text-center 
                            font-medium text-gray-800"
            onClick={()=>navigate("/profile")}
             >
                 Profile
             </li>
             {/* <li 
                 className="cursor-pointer px-5 py-2 hover:bg-red-500 hover:text-white transition-all 
                            text-center font-medium text-gray-800"
                onClick={handleLogout}
             >
                 Logout
             </li> */}
             <li 
                 className="cursor-pointer px-5 py-2 hover:bg-red-500 hover:text-white transition-all 
                            text-center font-medium text-gray-800"
                onClick={()=>navigate("/saved")}
             >
                 Saved
             </li>
         </ul>
     </div>
     
      }
            
        </div>
        </>
    )
}

export default ProfileIcon