import React, { useState } from "react";

const DestinationSearch = () => {
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    if (destination.trim() === "") {
      alert("Please enter a destination.");
    } else {
      alert(`Finding route to: ${destination}`);
    }
  };

  return (
    // 1. Changed to a horizontal flex layout on all screen sizes
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Enter destination..."
        // 2. Changed to flex-1 to take up available space on all screen sizes
        className="flex-1 px-4 py-3 rounded-lg bg-slate-800/70 border border-slate-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button
        // 3. Removed w-full so the button sizes to its content
        className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/40 hover:shadow-blue-500/40 transition"
        onClick={handleSearch}
      >
        Find Route
      </button>
    </div>
  );
};

export default DestinationSearch;