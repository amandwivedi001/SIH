import React from "react";
import { Button } from "../ui/Button";

const DestinationSearch = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter your destination..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button variant="primary" className="px-6">
          Find Route
        </Button>
      </div>
    </div>
  );
};

export default DestinationSearch;
