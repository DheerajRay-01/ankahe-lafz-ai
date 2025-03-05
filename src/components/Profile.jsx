import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./redux/slices/userSlice";
import { useNavigate } from "react-router";
import axios from "../axios/axios";
import { GiFeather } from "react-icons/gi";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const profileInitial = user?.fullname ? user.fullname.charAt(0).toUpperCase() : null;

    const handleLogout = async () => {
        try {
            await axios.post("/user/logout");
            localStorage.removeItem("token");
            dispatch(deleteUser());
            navigate("/login");
        } catch (error) {
            console.error("Error in Logout:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-6 py-12">
            {/* Title */}
            <h1 className="flex gap-4 text-3xl md:text-4xl font-berkshire text-center mb-6 italic tracking-wide text-gray-200">
                <span
                    className="name"
                    style={{
                        fontFamily: "'Berkshire Swash', cursive",
                        fontWeight: 400,
                        fontStyle: "normal",
                    }}
                >
                    Ankahe Lafz
                </span>
                <GiFeather className="text-amber-300 rotate-9"/>
            </h1>

            <div className="w-full max-w-2xl bg-gray-900 text-white rounded-3xl shadow-lg border border-gray-700 p-12 flex flex-col items-center space-y-8 transition-all duration-300 hover:shadow-2xl">
                {/* Profile Picture / Initial */}
                <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-4xl font-bold text-white shadow-xl border-4 border-gray-500 overflow-hidden">
                    {profileInitial ? (
                        <span className="drop-shadow-lg">{profileInitial}</span>
                    ) : (
                        <img 
                            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                            alt="Profile Icon"
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* User Info */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">{user?.fullname || "Anonymous User"}</h2>
                    <p className="text-gray-400 text-lg">@{user?.username || "unknown"}</p>
                </div>

                {/* Logout Button */}
                <button 
                    className="px-8 py-4 w-full max-w-sm bg-red-600 hover:bg-red-700 transition-all duration-300 text-lg font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-red-500"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;