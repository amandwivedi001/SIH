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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
        Recent <span className="text-[#EDB74B]">Searches</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
