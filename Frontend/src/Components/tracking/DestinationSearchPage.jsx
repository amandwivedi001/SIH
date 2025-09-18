// src/Components/tracking/DestinationSearchPage.jsx
import React from "react";
import DestinationSearch from "./DestinationSearch";

const DestinationSearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="flex-1 px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
        {/* ✅ Search bar stays at same top position */}
        <DestinationSearch />
      </div>
    </div>
  );
};

export default DestinationSearchPage;
