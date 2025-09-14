// src/Components/tracking/TrackingPage.jsx
import React, { useEffect, useState } from "react";
import DestinationSearch from "./DestinationSearch";
import NearestStop from "./NearestStop";
import StopsList from "./StopList";
import MapView from "./MapView";

const TrackingPage = () => {
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  useEffect(() => {
    // read and clear the flag - robust across navigation
    try {
      const flag = sessionStorage.getItem("tracksec_logged_in");
      if (flag === "1") {
        setShowLoginMsg(true);
        sessionStorage.removeItem("tracksec_logged_in");
        const t = setTimeout(() => setShowLoginMsg(false), 3000); // hide after 3s
        return () => clearTimeout(t);
      }
    } catch (e) {
      // sessionStorage may be blocked in some browsers; fallback: do nothing
      console.warn("sessionStorage read failed", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* centered top banner */}
      {showLoginMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-lg animate-fade-in">
            ✅ Successfully logged in
          </div>
        </div>
      )}

      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <DestinationSearch />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="space-y-6 lg:col-span-1">
              <NearestStop />
              <StopsList />
            </div>
            <div className="lg:col-span-2">
              <MapView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
