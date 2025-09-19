// src/Components/tracking/TrackingPage.jsx
import React, { useEffect, useState } from "react";
import DestinationSearch from "./DestinationSearch";
import NearestStop from "./NearestStop";
import RecentSearches from "./RecentSearches";
import { useToast } from "../ui/ToastProvider";
import { useNavigate } from "react-router-dom";

const TrackingPage = () => {
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [progress, setProgress] = useState(100);
  const [userLocation, setUserLocation] = useState(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const flag = sessionStorage.getItem("tracksec_logged_in");
      if (flag === "1") {
        setShowLoginMsg(true);
        sessionStorage.removeItem("tracksec_logged_in");

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

  // ✅ ask location once here
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err.message);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  // ✅ Navigate to map page with location
  const goToMapView = () => {
    navigate("/mapView", { state: { userLocation } });
  };

  return (
    <div className="min-h-screen  bg-white text-slate-900 relative">
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
          <DestinationSearch />
          <RecentSearches />

          <main className="mt-8 w-full bg-slate-50 rounded-2xl border border-slate-200 shadow-md p-6">
            <div className="space-y-6 lg:col-span-1">
              {/* ✅ NearestStop now can use userLocation */}
              <NearestStop userLocation={userLocation} />
            </div>
          </main>
        </div>
      </div>

      <nav className="w-full px-6 pb-8">
        <button
          className="w-full bg-[#EDB74B] hover:bg-[#d9a43a] text-slate-900 font-semibold py-4 rounded-lg text-lg tracking-wide transition-colors shadow-md shadow-yellow-700/20 focus:outline-none focus:ring-2 focus:ring-[#EDB74B]/50"
          onClick={goToMapView}
        >
          SEE ALL BUS STOPS AROUND YOU
        </button>
      </nav>
    </div>
  );
};

export default TrackingPage;
