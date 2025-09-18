import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DestinationSearch = () => {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination.trim() === "") {
      alert("Please enter a destination.");
    } else {
      alert(`Finding route to: ${destination}`);
    }
  };

  const handleInputClick = () => {
    navigate("/destinationSearch"); // ✅ always navigate
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Enter destination..."
        className="flex-1 px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        onClick={handleInputClick}
      />
      <button
        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/40 hover:shadow-blue-500/40 transition"
        onClick={handleSearch}
      >
        Find Route
      </button>
    </div>
  );
};

export default DestinationSearch;
