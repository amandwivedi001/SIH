// src/Components/tracking/NearestStop.jsx
import React, { useState, useEffect } from "react";

// A mock function to simulate fetching data from an API
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
    }, 1500); // Simulate a 1.5-second network delay
  });
};


const NearestStop = () => {
  // State to hold the stop data, loading status, and any errors
  const [stop, setStop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const getData = async () => {
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

    getData();
  }, []); // The empty dependency array [] ensures this runs only once

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div className="text-center p-6">Loading nearest stop...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-400">{error}</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-md shadow-blue-900/30 hover:shadow-lg hover:shadow-blue-600/30 transition-all ">
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
             <span className="font-semibold">🚌 Bus #{bus.id}</span>
            <span className="text-emerald-400 font-bold">{bus.eta}</span>
            <span className="text-slate-400 text-sm">Bus #{bus.id}<span className="text-blue-500 font-bold">→</span>{bus.destination}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearestStop;