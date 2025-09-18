import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper to create a DivIcon from an inline SVG string
const createDivIcon = (svgString, size = [36, 36], className = "") =>
  L.divIcon({
    html: svgString,
    className: className || "leaflet-div-icon",
    iconSize: size,
    iconAnchor: [Math.floor(size[0] / 2), size[1]],
    popupAnchor: [0, -Math.floor(size[1] / 2)],
  });

// Current location icon: green circle with white ring (commonly used)
const currentLocationIcon = (size = 48) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 48 48' aria-hidden='true'>
      <circle cx='24' cy='24' r='10' fill='#22c55e' stroke='white' stroke-width='3' />
      <circle cx='24' cy='24' r='18' fill='none' stroke='#bbf7d0' stroke-opacity='0.35' stroke-width='3' />
    </svg>
  `;
  return createDivIcon(svg, [size, size], "current-location-icon");
};

// Bus icon: simple bus silhouette, filled with configurable color (we'll use black)
const busIcon = (size = 36, color = "black") => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 24 24' aria-hidden='true'>
      <!-- bus body -->
      <rect x='2' y='5' width='20' height='10' rx='2' fill='${color}' />
      <!-- windows (cutouts) -->
      <rect x='4' y='7' width='3.5' height='3' rx='0.4' fill='white' />
      <rect x='8' y='7' width='3.5' height='3' rx='0.4' fill='white' />
      <rect x='12' y='7' width='3.5' height='3' rx='0.4' fill='white' />
      <rect x='16' y='7' width='3.5' height='3' rx='0.4' fill='white' />
      <!-- wheels -->
      <circle cx='7.5' cy='17' r='1.5' fill='${color}' />
      <circle cx='16.5' cy='17' r='1.5' fill='${color}' />
    </svg>
  `;
  // Slightly larger anchor so the bus sits nicely on the point
  return createDivIcon(svg, [size, size], "bus-icon");
};

// A small helper that recenters the map when `position` changes.
function MapCenterer({ position }) {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    // smooth fly only the first time -- adapt as you like
    map.flyTo(position, 16, { duration: 0.6 });
  }, [position, map]);
  return null;
}

export default function MapView({
  busStops = [],
  initialCenter = [20.5937, 78.9629], // India center as safe default
  initialZoom = 12,
  className = "h-[1000px] w-full rounded-lg shadow",
}) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported");
      return;
    }

    // Use watchPosition so the current location updates while the user moves.
    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentPosition([pos.coords.latitude, pos.coords.longitude]);
        setGeoError(null);
      },
      (err) => {
        setGeoError(err.message || "Failed to get location");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  // Normalise bus stop coords so callers can pass {lat,lng} or {lat,lon}
  const normPos = (bs) => {
    const lat = bs.lat ?? bs.latitude;
    const lng = bs.lng ?? bs.lon ?? bs.longitude;
    return [lat, lng];
  };

  return (
    <div className={`relative ${className}`}>
      {/* Locate button overlay (Tailwind classes) */}
      <div className="absolute top-3 right-3 z-50 pointer-events-auto">
        <button
          onClick={() => {
            if (!navigator.geolocation) return setGeoError("Geolocation not supported");
            navigator.geolocation.getCurrentPosition(
              (p) => setCurrentPosition([p.coords.latitude, p.coords.longitude]),
              (e) => setGeoError(e.message || "Fail"),
              { enableHighAccuracy: true }
            );
          }}
          className="bg-white/90 backdrop-blur rounded-md px-3 py-2 text-sm shadow border border-gray-200 hover:shadow-md"
          title="Go to my location"
        >
          Locate me
        </button>
      </div>

      <MapContainer
        center={currentPosition ?? initialCenter}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {currentPosition && (
          <>
            <Marker
              position={currentPosition}
              icon={currentLocationIcon(48)}
              zIndexOffset={1000}
            >
              <Popup className="text-sm">You are here</Popup>
            </Marker>

            {/* accuracy circle (optional) */}
            <Circle
              center={currentPosition}
              radius={200}
              pathOptions={{ color: "#22c55e", fillColor: "#bbf7d0", fillOpacity: 0.18 }}
            />

            <MapCenterer position={currentPosition} />
          </>
        )}

        {Array.isArray(busStops) &&
          busStops.map((bs, idx) => {
            const coords = normPos(bs);
            // skip invalid
            if (!coords || coords.some((c) => typeof c !== "number")) return null;
            const id = bs.id ?? bs.name ?? idx;
            return (
              <Marker
                key={id}
                position={coords}
                icon={busIcon(40, "black")} // black bus icon and larger so it's clearly visible
                zIndexOffset={500}
              >
                <Popup className="text-sm">
                  <div className="font-medium">{bs.name ?? "Bus stop"}</div>
                  {bs.routes && <div className="text-xs text-gray-600">{bs.routes.join(", ")}</div>}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* optional geo error display */}
      {geoError && (
        <div className="absolute bottom-3 left-3 z-50 bg-white/95 p-2 rounded-md text-xs text-red-600 shadow border border-red-100">
          {geoError}
        </div>
      )}
    </div>
  );
}
