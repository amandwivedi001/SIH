import React from "react";
import { buses, stops } from "./mockData";

const NearestStop = () => {
  const nearestStop = stops[0]; // Mock: first stop is nearest
  const arrivingBuses = buses.filter((b) => b.stopId === nearestStop.id);

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">
        Nearest Stop: {nearestStop.name}
      </h2>
      <ul className="space-y-3">
        {arrivingBuses.map((bus) => (
          <li
            key={bus.id}
            className="p-3 bg-slate-800 rounded-lg flex justify-between items-center shadow hover:bg-slate-700 transition"
          >
            <span className="font-semibold text-white">🚌 {bus.id}</span>
            <span className="text-slate-300">{bus.destination}</span>
            <span className="text-green-400">{bus.eta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearestStop;
