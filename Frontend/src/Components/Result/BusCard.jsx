import React from "react";

const BusCard = ({ busName, nextStop, eta, onShowRoute }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg space-y-2 border border-gray-200">
      <h2 className="text-lg font-bold">{busName}</h2>
      <p className="text-sm text-gray-700">Next stop: {nextStop}</p>
      <p className="text-sm text-gray-500">ETA: {eta} mins</p>
      <button
        className="mt-2 w-full py-2 bg-yellow-500 text-slate-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
        onClick={onShowRoute}
      >
        Chalo Show Route
      </button>
    </div>
  );
};

export default BusCard;
