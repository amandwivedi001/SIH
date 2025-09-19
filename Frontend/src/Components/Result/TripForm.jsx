import React, { useState } from "react";

// Geocoding helper function
const geocode = async (place) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
  );
  const data = await res.json();
  if (data.length > 0) {
    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }
  return null;
};

const TripForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("Rajwada, Indore");
  const [time, setTime] = useState("09:20");

  const handleSubmit = async () => {
    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }

    // Convert place names to coordinates
    const originCoords = await geocode(origin);
    const destinationCoords = await geocode(destination);

    if (!originCoords || !destinationCoords) {
      alert("Could not find one or both locations. Try again.");
      return;
    }

    // Send back coordinates instead of plain text
    onSearch({ origin: originCoords, destination: destinationCoords, time });
  };

  return (
    <div className="p-4 bg-white text-slate-900 space-y-3 shadow-md">
      <input
        type="text"
        placeholder="Enter origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
      />

      <div className="flex gap-3">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <button className="px-4 py-2 border rounded-lg">⚙ Options</button>
      </div>

      <button
        className="w-full py-3 bg-yellow-500 text-slate-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
        onClick={handleSubmit}
      >
        GET ROUTE
      </button>
    </div>
  );
};

export default TripForm;
