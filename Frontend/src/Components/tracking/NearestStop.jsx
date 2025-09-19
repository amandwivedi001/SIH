// src/Components/tracking/NearestStop.jsx
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Bus, RefreshCw } from "lucide-react";

// Mock API function
const fetchNearestStopData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Central Station",
        distance: "200m",
        buses: [
          { id: 21, eta: "5 min", destination: "City Mall" },
          { id: 45, eta: "8 min", destination: "Railway Station" },
          { id: 12, eta: "12 min", destination: "University" },
        ],
      });
    }, 1500);
  });
};

const NearestStop = () => {
  const [stop, setStop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchNearestStopData();
      setStop(data);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6 text-slate-300 animate-pulse">
        Loading nearest stop...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg shadow-blue-900/40 border border-blue-500/10">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Nearest Stop</h2>
        <button
          onClick={loadData}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/40 transition"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Stop Info */}
      <p className="flex items-center gap-2 text-slate-300 mb-6">
        <MapPin className="w-4 h-4 text-rose-400" />
        <span className="font-medium">
          {stop.name}{" "}
          <span className="text-slate-400">({stop.distance} away)</span>
        </span>
      </p>

      {/* Bus Cards */}
      <div className="space-y-3">
        {stop.buses.map((bus) => (
          <div
            key={bus.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 transition transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-800/30"
          >
            {/* Left: Bus Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 shadow-md shadow-blue-900/30">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Bus #{bus.id}</p>
                <p className="text-sm text-slate-400">{bus.destination}</p>
              </div>
            </div>

            {/* Right: ETA */}
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <Clock className="w-4 h-4" />
              {bus.eta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearestStop;
