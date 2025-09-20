import React, { useState, useEffect } from "react";
import TripForm from "./TripForm";
import TripMap from "./TripMap";
import BusCard from "./BusCard";

const TripPlanner = () => {
  const [tripData, setTripData] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [liveBusLocation, setLiveBusLocation] = useState(null);

  const handleShowRoute = (bus) => {
    setSelectedBus(bus);
  };

  // Poll backend for live bus location every 3 seconds
  useEffect(() => {
    if (!selectedBus) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/bus/${selectedBus.busName}/location`);
        const data = await res.json();
        setLiveBusLocation({ ...data, busName: selectedBus.busName });
      } catch (err) {
        console.error("Error fetching bus location:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedBus]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TripForm
        onSearch={(data) => {
          setTripData(data);
          setSelectedBus(null);
          setLiveBusLocation(null);
        }}
      />

      {/* Bus list after search */}
      {!selectedBus && tripData && (
        <BusCard
          busName="Bus M-1"
          nextStop="IT Park"
          eta={2.3}
          onShowRoute={() =>
            handleShowRoute({
              busName: "Bus M-1",
              origin: tripData.origin,
              destination: tripData.destination,
              busStops: [], // no auto bus stops
            })
          }
        />
      )}

      {/* Show map when bus selected */}
      {selectedBus && tripData && (
        <TripMap
          origin={selectedBus.origin}
          destination={selectedBus.destination}
          busStops={selectedBus.busStops}
          liveBusLocation={liveBusLocation}
        />
      )}
    </div>
  );
};

export default TripPlanner;
