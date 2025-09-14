// src/Components/tracking/DestinationSearch.jsx
import React from "react";

const DestinationSearch = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Enter destination..."
        className="flex-1 px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/40 hover:shadow-blue-500/40 transition">
        Find Route
      </button>
    </div>
  );
};

export default DestinationSearch;
