import { useEffect, useState } from "react";
import axios from "../axios/axios";
import SeeSaved from "./SeeSaved";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const Saved = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [seeSavedData, setSeeSavedData] = useState(null);
  const [seeSavedDataOpen, setSeeSavedDataOpen] = useState(false);
  const [loading, setLoading] = useState(true); // <-- Loading state

  const handleSaveClicked = (item) => {
    setSeeSavedData(item);
    setSeeSavedDataOpen(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("content/get-all");
      const allContent = response.data.data.allContent;

      // Sorting: Newly created first (descending order of createdAt)
      const sortedContent = allContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setData(sortedContent);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // <-- Stop loading after fetch
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
<div 
  className="absolute top-6 left-6 flex items-center gap-2 text-amber-50 cursor-pointer text-xl md:text-2xl transition-all duration-300 hover:text-amber-400"
  onClick={() => navigate("/")}
>
  <IoArrowBackCircleOutline className="text-3xl md:text-4xl hover:scale-110 transition-transform duration-200" />
  <span className="hidden md:inline">Back</span>
</div>

      <h3 className="text-3xl md:text-4xl  font-semibold text-center mb-8 text-gray-200">
        Saved Posts
      </h3>

      {loading ? ( // <-- Show loading indicator
        <div className="flex m-auto items-center justify-center h-40 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-800 text-gray-300 text-lg font-semibold rounded-xl shadow-md border border-gray-700 p-4 text-center">
          Loading...
        </div>
      ) : data.length === 0 ? (
        <div className="flex m-auto items-center justify-center h-40 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-800 text-gray-300 text-lg font-semibold rounded-xl shadow-md border border-gray-700 p-4 text-center">
          No saved posts yet.
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {data.map((item, index) => (
            <div
              onClick={() => handleSaveClicked(item)}
              key={index}
              className="relative p-6 rounded-3xl bg-gray-900 text-white shadow-lg border border-gray-700 max-w-xs w-full md:w-72 lg:w-80 xl:w-96 transition-all duration-300 hover:shadow-2xl"
            >
              <div
                className="text-lg leading-relaxed tracking-wide whitespace-pre-line overflow-hidden 
                           line-clamp-3 h-[6.4em] scrollbar-thin scrollbar-thumb-amber-400 
                           scrollbar-track-gray-700"
                style={{
                  fontFamily: item.language === "Hindi" ? "'Gotu', sans-serif" : "'Amita', serif",
                  fontWeight: 600,
                  fontStyle: "normal",
                }}
                dangerouslySetInnerHTML={{
                  __html: item?.content,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {seeSavedDataOpen && <SeeSaved data={seeSavedData} popup={setSeeSavedDataOpen} />}
    </div>
  );
};

export default Saved;
