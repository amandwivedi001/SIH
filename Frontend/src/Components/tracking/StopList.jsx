// src/Components/tracking/StopsList.jsx
import React from "react";

const StopsList = () => {
  const stops = ["Market Square", "Town Hall", "Tech Park", "Airport Road"];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-md shadow-blue-900/30">
      <h2 className="text-xl font-bold mb-4">Nearby Stops</h2>
      <ul className="space-y-2">
        {stops.map((stop, i) => (
          <li
            key={i}
            className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 cursor-pointer transition"
          >
            📍 {stop}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopsList;
