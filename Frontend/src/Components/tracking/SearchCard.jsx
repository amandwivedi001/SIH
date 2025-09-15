// src/Components/SearchCard.jsx
import React from "react";

const SearchCard = ({ from, to }) => {
  return (
    // Using smaller, non-responsive classes for a compact look
    <div className="bg-white text-slate-900 rounded-lg shadow-md hover:shadow-lg transition p-3 cursor-pointer">
      <div className="flex items-center space-x-2">
        <span className="text-base">📍</span>
        <h3 className="font-semibold truncate text-sm">{from}</h3>
      </div>
      <p className="text-xs text-slate-600 mt-1">To {to}</p>
    </div>
  );
};

export default SearchCard;