import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationSearch = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
  if (destination.trim() === "") {
    alert("Please enter a destination.");
  } else {
    navigate(`/trip-planner`);
  }
};


  const handleInputClick = () => {
    navigate("/destinationSearch"); // ✅ always navigate
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <input
        type="text"
        placeholder="Enter destination..."
        className="flex-1 px-4 py-3 rounded-lg bg-white border border-yellow-400/60 text-black 
                   placeholder-slate-800 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        onClick={handleInputClick}
      />
      <button
        className="px-6 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 
                   text-slate-900 font-semibold shadow-md shadow-yellow-900/30 
                   hover:shadow-yellow-500/40 transition duration-300 focus:ring-2 
                   focus:ring-yellow-400 focus:outline-none"
        onClick={handleSearch}
      >
        Find Route
      </button>
    </div>
  );
};

export default DestinationSearch;
