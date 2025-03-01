import React, { useState ,useEffect } from "react";
import { geminiResponse } from "./gemini/model";
import ResponseBox from "./ResponseBox";
import { Send } from "react-feather"; // Using React Icons
import { GiFeather } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";

function ChatScreen() {
    const reduxResponse = useSelector((state) => state.response.response);
  const dispatch = useDispatch()
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lang , setLang] = useState("Hindi")
  // console.log(lang);
  
  
  useEffect(() => {
    setResponse(reduxResponse);
  }, [reduxResponse]); // Runs whenever reduxResponse updates
  


  // get gemini response
  const handleFetchResponse = async (e) => {
      e.preventDefault();
      if (!prompt.trim()) return;
      
      setIsLoading(true);
      setPrompt("");
      
      try {
          
          await geminiResponse(prompt,dispatch,lang);
          // console.log("Response:", response);
          //   console.log("Redux Response:", reduxResponse);
        //   setResponse(reduxResponse);
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Error generating response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Title with Berkshire Swash Font */}
    
      <h1 className="flex gap-4 text-3xl md:text-4xl font-berkshire text-center mb-4 italic tracking-wide text-gray-200">
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

        {<GiFeather className="text-amber-300 rotate-9"/>}
      </h1>

      {/* Response Display */}
      <ResponseBox res={response} isGet={isLoading} setLan={setLang} lang={lang}/>

      {/* Chat Input Section */}
      <form
  onSubmit={handleFetchResponse}
  className="w-full max-w-2xl flex items-center gap-3 mt-6 bg-gray-700 p-3 rounded-xl shadow-lg border border-gray-600"
>
  <input
    type="text"
    className="flex-1 min-w-0 p-3 bg-transparent border border-gray-500 rounded-lg outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300 text-lg"
    onChange={(e) => setPrompt(e.target.value)}
    value={prompt}
    placeholder="Shape your thoughts..."
    aria-label="Prompt input"
  />
  <button
    type="submit"
    className={`flex items-center justify-center whitespace-nowrap bg-purple-600 text-white px-5 py-2 rounded-lg transition-all ${
      isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-500"
    }`}
    disabled={isLoading}
  >
    {isLoading ? "Crafting..." : <Send size={22} />}
  </button>
</form>

    </div>
  );
}

export default ChatScreen;
