// src/Components/tracking/NearestStop.jsx
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Bus, RefreshCw } from "lucide-react";

// Mock API function with location support
const fetchNearestStopData = (userLocation) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!userLocation) {
        reject("Location not available");
      } else {
        resolve({
          name: "Maharaja Ranjeet Singh",
          distance: "200m",
          buses: [
            { id: 21, eta: "5 min", destination: "Teen Imli" },
            { id: 45, eta: "8 min", destination: "Railway Station" },
            { id: 12, eta: "12 min", destination: "University" },
          ],
        });
      }
    }, 1200);
  });
};

const NearestStop = ({ userLocation, loadingLocation, geoError }) => {
  const [stop, setStop] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNearestStopData(userLocation);
      setStop(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // fetch when location is available
  useEffect(() => {
    if (userLocation) {
      loadData();
    }
  }, [userLocation]);

  if (loadingLocation) {
    return (
      <div className="text-center p-6 text-slate-500 animate-pulse">
        📍 Detecting your location...
      </div>
    );
  }

  if (geoError) {
    return (
      <div className="text-center p-6 text-red-500">
        ❌ {geoError} <br /> Please allow location to see nearest bus stops.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-6 text-slate-500 animate-pulse">
        Loading nearest stop...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">{error}</div>
    );
  }

  if (!stop) {
    return (
      <div className="text-center p-6 text-slate-400">
        ⚠️ No stop data available
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-slate-900">Nearest Stop</h2>
        <button
          onClick={loadData}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
          title="Refresh"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Stop Info */}
      <p className="flex items-center gap-2 text-slate-600 mb-6">
        <MapPin className="w-4 h-4 text-[#EDB74B]" />
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
            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-[#EDB74B]/10 transition transform hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Left: Bus Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#EDB74B] text-white shadow-md">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Bus #{bus.id}</p>
                <p className="text-sm text-slate-600">{bus.destination}</p>
              </div>
            </div>

            {/* Right: ETA */}
            <div className="flex items-center gap-1 text-emerald-600 font-bold">
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
