// src/Components/tracking/TrackingPage.jsx
import React, { useEffect, useState } from "react";
import DestinationSearch from "./DestinationSearch";
import NearestStop from "./NearestStop";
import StopsList from "./StopList";
import { useToast } from "../ui/ToastProvider";
import RecentSearches from "./RecentSearches";
import { useNavigate } from "react-router-dom";

const TrackingPage = () => {
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [progress, setProgress] = useState(100); // progress for banner
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const flag = sessionStorage.getItem("tracksec_logged_in");
      if (flag === "1") {
        setShowLoginMsg(true);
        sessionStorage.removeItem("tracksec_logged_in");
        // progress bar countdown
        let p = 100;
        const interval = setInterval(() => {
          p -= 5;
          setProgress(p);
          if (p <= 0) {
            clearInterval(interval);
            setShowLoginMsg(false);
          }
        }, 150);
      }
    } catch (e) {
      console.warn("sessionStorage read failed", e);
    }
  }, [showToast]);

  // ✅ navigate properly
  const goToMapView = () => {
    navigate("/mapView"); // React Router will render <MapView />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* Login success banner */}
      {showLoginMsg && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-80">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in relative">
            ✅ Successfully logged in
            <div
              className="absolute bottom-0 left-0 h-1 bg-white/60 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="pt-11 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Destination input */}
          <DestinationSearch />

          {/* Recent Searches Card */}
          <RecentSearches />

          <main className="mt-8 w-full bg-gray-900 text-white">
            {/* Left column */}
            <div className="space-y-6 lg:col-span-1">
              <NearestStop />
            </div>
          </main>
        </div>
      </div>

      {/* ✅ Button at bottom */}
      <nav className="w-full px-6 pb-8">
        <button
          className="w-full bg-gray-900 hover:bg-slate-700/60 text-white font-semibold py-4 rounded-lg text-lg tracking-wide transition-colors"
          onClick={goToMapView} // ✅ directly call function
        >
          SEE ALL BUS STOPS AROUND YOU
        </button>
      </nav>
    </div>
  );
};

export default TrackingPage;
