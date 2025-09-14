// src/Components/tracking/NearestStop.jsx
import React from "react";

const NearestStop = () => {
  // Mock nearest stop + buses data
  const stop = {
    name: "Central Station",
    distance: "200m",
    buses: [
      { id: 21, eta: "5 min", destination: "City Mall" },
      { id: 45, eta: "8 min", destination: "Railway Station" },
      { id: 12, eta: "12 min", destination: "University" },
    ],
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-600/30 transition-all">
      <h2 className="text-xl font-bold mb-2">Nearest Stop</h2>
      <p className="text-slate-300 mb-4">
        📍 {stop.name} ({stop.distance} away)
      </p>

      <ul className="space-y-2">
        {stop.buses.map((bus) => (
          <li
            key={bus.id}
            className="flex justify-between items-center p-3 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 transition"
          >
            <div>
              🚌 <span className="font-semibold">Bus #{bus.id}</span>
              <p className="text-slate-400 text-sm">{bus.destination}</p>
            </div>
            <span className="text-emerald-400 font-bold">{bus.eta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearestStop;
