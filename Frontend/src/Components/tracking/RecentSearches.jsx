// src/Components/RecentSearches.jsx
import React from "react";
import SearchCard from "./SearchCard"; // Import the new component

const RecentSearches = () => {
  // Mock data array - later, this will come from state or an API
  const recentSearchesData = [
    { id: 1, from: "I.E.T. College", to: "Rajwada" },
    { id: 2, from: "Choti Gwaltoli", to: "Rajwada" },
    { id: 3, from: "Devi Ahilya Vishwavidyalaya", to: "City Center" },
    { id: 4, from: "Sarwate Bus Stand", to: "Airport" },
  ];

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl shadow-lg p-6 mt-4">
      <h2 className="text-xl font-semibold text-blue-400 mb-6">
        Recent Searches
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map over the data array to render a card for each search */}
        {recentSearchesData.map((search) => (
          <SearchCard
            key={search.id}
            from={search.from}
            to={search.to}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;