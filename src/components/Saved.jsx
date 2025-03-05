import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { Navigate } from "react-router";
import SeeSaved from "./SeeSaved";

const Saved = () => {
  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [seeSavedData ,setSeeSavedData] = useState()
  const [seeSavedDataOpen ,setSeeSavedDataOpen] = useState(false)

  const handleSaveClicked = (e,item)=>{
      setSeeSavedData(item)
    setSeeSavedDataOpen(true)
    // setClicked(!clicked)
    // console.log(seeSavedData);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("content/get-all");
      const allContent = response.data.data.allContent;
  
      // Sorting: Newly created first (descending order of createdAt)
      const sortedContent = allContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setData(sortedContent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-12">
      <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-gray-200">
        Saved Posts
      </h3>

      {
        data.length === 0 ? (
            <div className="flex m-auto items-center justify-center h-40 w-96 bg-gray-800 text-gray-300 text-lg font-semibold rounded-xl shadow-md border border-gray-700">
            No saved posts yet.
          </div>
        ):(

            
      <div className="flex flex-wrap justify-center gap-6">
      {data?.map((item, index) => (
        <div
        onClick={(e)=>handleSaveClicked(e,item)}
        key={index}
          className="relative p-6 rounded-3xl bg-gray-900 text-white shadow-lg 
                     border border-gray-700 max-w-xs w-full md:w-72 lg:w-80 xl:w-96 
                     transition-all duration-300 hover:shadow-2xl"
        >
          <div
            className="text-lg leading-relaxed tracking-wide whitespace-pre-line overflow-hidden 
                       line-clamp-3 h-[6.4em] scrollbar-thin scrollbar-thumb-amber-400 
                       scrollbar-track-gray-700 "

            style={{
              fontFamily:
                item.language === "Hindi" ? "'Gotu', sans-serif" : "'Amita', serif",
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


        )

      }

        {
            seeSavedDataOpen &&
           <SeeSaved data={seeSavedData} popup={setSeeSavedDataOpen}/>
        }

    </div>
  );
};

export default Saved;
