import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TripHeader from "./TripHeader";
import TripForm from "./TripForm";
import TripMap from "./TripMap";

const TripPlannerPage = () => {
  const [tripData, setTripData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destination = params.get("destination");
    if (destination) {
      setTripData({ origin: "", destination, time: "09:20" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <TripHeader />
      <TripForm onSearch={setTripData} />
      <TripMap origin={tripData?.origin} destination={tripData?.destination} />
    </div>
  );
};

export default TripPlannerPage;
