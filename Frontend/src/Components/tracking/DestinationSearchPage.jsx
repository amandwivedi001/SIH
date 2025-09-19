// src/Components/tracking/DestinationSearchPage.jsx
import React from "react";
import DestinationSearch from "./DestinationSearch";

const DestinationSearchPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="flex-1 px-4 py-6 rounded-lg text-white 
                      focus:ring-2 focus:ring-yellow-400 focus:outline-none">
        {/* ✅ Search bar stays at same top position */}
        <DestinationSearch />
      </div>
    </div>
  );
};

export default DestinationSearchPage;
