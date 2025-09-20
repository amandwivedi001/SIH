import React from "react";
import { useNavigate } from "react-router-dom";

const TripHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 px-4 py-3 bg-gray-100 text-slate-900 shadow-md">
      <button onClick={() => navigate(-1)} className="text-lg font-bold">
        ←
      </button>
      <h2 className="text-xl font-semibold">Trip Planner</h2>
    </div>
  );
};

export default TripHeader;
