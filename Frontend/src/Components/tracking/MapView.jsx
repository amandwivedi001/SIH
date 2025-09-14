import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { userLocation, stops } from "./mockData";

const MapView = ({ selectedStop }) => {
  return (
    <div className="h-96 w-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>📍 You are here</Popup>
        </Marker>
        {stops.map((stop) => (
          <Marker key={stop.id} position={[stop.lat, stop.lng]}>
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}
        {selectedStop && (
          <Marker position={[selectedStop.lat, selectedStop.lng]}>
            <Popup>Selected Stop: {selectedStop.name}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
