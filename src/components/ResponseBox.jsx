import { useEffect, useState } from "react";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import LanguageSelector from "./LanguageSelector";
import { useDispatch } from "react-redux";
import { addResponse } from "./redux/slices/responseSlice";
import { MdOutlineBookmarkAdded ,MdOutlineBookmarkAdd} from "react-icons/md";
import axios from "../axios/axios";
import { Content } from "../../../backend/src/models/content.model";

function ResponseBox({ res, isGet,setLan,lang }) {
  const dispatch = useDispatch()
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  

  useEffect(()=>{
    dispatch(addResponse(" "))
    // console.log("changed"); 
  },[lang])

  const handleCopy = () => {
    navigator.clipboard.writeText(res);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };
  const handleSave = async () => {
    setSaved(true); // Indicate that saving has started
  
    try {
      const add = await axios.post("/content/upload", { content: res, language: lang });
      // console.log("Saved:", add);
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setTimeout(() => {
        setSaved(false); // Reset state after 2 seconds
      }, 2000);
    }
  };
  
  return (
    <div 
      className="relative bg-gradient-to-b from-gray-50 to-gray-100 shadow-xl rounded-2xl p-6 mt-6 
                 border border-gray-200 mx-auto w-full max-w-3xl transition-all duration-300"
    >
    
      {/* Response Content */}
      <div
        className="text-gray-900 leading-loose tracking-wide whitespace-pre-line min-h-[50vh] max-h-[60vh] 
                   overflow-y-auto p-4 md:pr-8 scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-200 text-lg"
        style={{
          fontFamily: lang === "Hindi" ?  "'Gotu', sans-serif" : "'Amita', serif",
          fontWeight: 600,
          fontStyle: "normal",
        }}
        dangerouslySetInnerHTML={{
          __html: isGet
            ? `<span class="text-gray-500 italic">Writing...</span>` 
            : res.replace(/\n/g, "<br>"),
        }}
      />

<div className="absolute top-2 right-1 sm:top-4 sm:right-4 flex flex-col items-center gap-3">
  {/* Copy Button */}

  {!isGet && (
  <button
    onClick={handleCopy}
    className="p-3 rounded-full bg-white/80 hover:bg-white transition-all 
               duration-300 scale-100 hover:scale-110 shadow-md shadow-gray-400/50 
               backdrop-blur-md border border-gray-300 cursor-pointer
               flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
    aria-label="Copy text"
  >
    {copied ? (
      <FaCheck className="text-green-600" size={20} />
    ) : (
      <FaRegCopy className="text-gray-700" size={20} />
    )}
  </button>
)}

<button
onClick={handleSave}
    className="p-3 rounded-full bg-white/80 hover:bg-white transition-all 
               duration-300 scale-100 hover:scale-110 shadow-md shadow-gray-400/50 
               backdrop-blur-md border cursor-pointer border-gray-300
               flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
  >
      {saved ? (
      <MdOutlineBookmarkAdded className="text-green-600" size={30} />
    ) : (
      <MdOutlineBookmarkAdd className="text-gray-700" size={30}/>
    )}
  </button>


   
  <LanguageSelector setLang={setLan} selectedLang={lang}/>

</div>


    </div>
  );
}

export default ResponseBox;
