import React, { useState, useEffect, useRef } from "react";

function LanguageSelector({ setLang ,selectedLang}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languages = ["Hindi", "English","Hinglish"];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button to Open Dropdown (Styled like Copy Button) */}
      <button
  onClick={() => setIsOpen(!isOpen)}
  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center 
             text-gray-900 bg-white/90 hover:bg-white transition-all duration-300 
             rounded-3xl shadow-md shadow-gray-400/50 border border-gray-300
             font-semibold text-sm sm:text-base capitalize tracking-wide"
  style={{ 
    fontFamily: "'Gotu', sans-serif",  // Custom font
    letterSpacing: "1px",              // Spaced-out letters
    fontWeight: "bold"                 // Bold text
  }}
  aria-label="Selected Language"
>
  {selectedLang === "Hinglish" ? "Hng" : selectedLang.slice(0, 3)}
</button>



      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-36 bg-white text-gray-900 rounded-lg 
                    shadow-lg border border-gray-300 overflow-hidden transition-all 
                    duration-200 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <ul className="flex flex-col">
          {languages.map((lang) => (
            <li
              key={lang}
              onClick={() => {
                setLang(lang);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-gray-200 transition-all text-center"
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LanguageSelector;
