import React from "react";
import { stops } from "./mockData";

const StopsList = ({ onSelectStop }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg h-80 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3 text-blue-400">
        Nearby Bus Stops
      </h3>
      <ul className="space-y-2">
        {stops.map((stop) => (
          <li
            key={stop.id}
            className="cursor-pointer p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"
            onClick={() => onSelectStop(stop)}
          >
            <span className="text-white">{stop.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StopsList;
