import React, { useState } from "react";
import TripForm from "./TripForm";
import TripMap from "./TripMap";
import BusCard from "./BusCard";

const TripPlanner = () => {
  const [tripData, setTripData] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null); // Store clicked bus

  const handleShowRoute = (bus) => {
    setSelectedBus(bus); // Save the bus clicked
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TripForm
        onSearch={(data) => {
          setTripData(data);
          setSelectedBus(null); // Reset when user searches again
        }}
      />

      {tripData && !selectedBus && (
        <BusCard
          busName="Bus M-1"
          nextStop="IT Park"
          eta={2.3}
          onShowRoute={() =>
            handleShowRoute({
              busName: "Bus M-1",
              nextStop: "IT Park",
              origin: tripData.origin,
              destination: tripData.destination,
              busStops: [[22.7212, 75.8570]], // Optional: next stop coords
            })
          }
        />
      )}

      {tripData && selectedBus && (
        <TripMap
          origin={selectedBus.origin}
          destination={selectedBus.destination}
          busStops={selectedBus.busStops} // pass bus stops if needed in route
        />
      )}
    </div>
  );
};

export default TripPlanner;
