import React, { useState } from "react";

const TripForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("Rajwada, Indore");
  const [time, setTime] = useState("09:20");

  const handleSubmit = () => {
    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }
    onSearch({ origin, destination, time });
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
