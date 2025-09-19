// src/Components/tracking/MapView.jsx
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "react-router-dom";

const createDivIcon = (svg, size = [36, 36]) =>
  L.divIcon({ html: svg, className: "leaflet-div-icon", iconSize: size });

const currentLocationIcon = (size = 48) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 48 48'>
      <circle cx='24' cy='24' r='10' fill='#22c55e' stroke='white' stroke-width='3' />
      <circle cx='24' cy='24' r='18' fill='none' stroke='#bbf7d0' stroke-opacity='0.35' stroke-width='3' />
    </svg>
  `;
  return createDivIcon(svg, [size, size]);
};

export default function MapView() {
  const location = useLocation();
  const userLocation = location.state?.userLocation;

  return (
    <div className="h-screen w-screen">
      <MapContainer
        center={userLocation ?? [22.7196, 75.8577]} // fallback Indore center
        zoom={14}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Marker position={userLocation} icon={currentLocationIcon(48)}>
              <Popup>You are here</Popup>
            </Marker>
            <Circle
              center={userLocation}
              radius={1200}
              pathOptions={{ color: "#22c55e", fillColor: "#bbf7d0", fillOpacity: 0.18 }}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}
