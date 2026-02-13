
import React from 'react';

interface Props {
  onClick: () => void;
}

export const GiftBox: React.FC<Props> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="group relative w-48 h-48 mx-auto transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
    >
      {/* Gift Box Body */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-rose-500 rounded-b-lg shadow-xl group-hover:bg-rose-600 transition-colors">
        {/* Ribbon Vertical */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-white shadow-inner"></div>
      </div>
      
      {/* Gift Box Lid */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 w-52 h-10 bg-rose-400 rounded-lg shadow-lg group-hover:-translate-y-4 transition-transform duration-300">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-white"></div>
      </div>

      {/* Ribbon Bow */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-12 group-hover:scale-110 transition-transform">
        <div className="absolute left-0 w-10 h-10 bg-white rounded-full rotate-45 border-4 border-rose-200"></div>
        <div className="absolute right-0 w-10 h-10 bg-white rounded-full -rotate-45 border-4 border-rose-200"></div>
      </div>
    </button>
  );
};
