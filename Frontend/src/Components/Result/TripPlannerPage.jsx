import React, { useState } from "react";
import TripForm from "./TripForm";
import TripMap from "./TripMap";

const TripPlanner = () => {
  const [tripData, setTripData] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TripForm onSearch={(data) => setTripData(data)} />
      {tripData && (
        <TripMap
          origin={tripData.origin}
          destination={tripData.destination}
        />
      )}
    </div>
  );
};

export default TripPlanner;
