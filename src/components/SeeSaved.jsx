import { useEffect, useState } from "react";
import { forwardRef } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const SeeSaved = ({data , popup},ref) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative bg-gray-900 text-white p-6 md:p-8 rounded-3xl shadow-lg max-w-3xl w-full mx-4">
      {/* Close Button */}
      <button
        // ref={ref}
        onClick={()=>popup(false)}
        className="absolute top-2 left-2 text-gray-400 hover:text-gray-200 text-2xl"
      >
        <IoCloseCircleSharp/>
      </button>

      {/* Content */}
      <div
        className="leading-loose tracking-wide whitespace-pre-line min-h-[50vh] max-h-[60vh] 
                   overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-gray-700 text-lg p-2"
        style={{
          fontFamily: data?.language === "Hindi" ? "'Gotu', sans-serif" : "'Amita', serif",
          fontWeight: 600,
          fontStyle: "normal",
        }}
        dangerouslySetInnerHTML={{
          __html: data?.content,
        }}
      />
    </div>
  </div>
  );
};

export default  forwardRef(SeeSaved) ;
