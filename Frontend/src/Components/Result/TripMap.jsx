import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

const TripMap = ({ origin, destination }) => {
  // Dummy coordinates (Indore Rajwada → IET DAVV)
  const originCoords = [22.7196, 75.8577];
  const destinationCoords = [22.6816, 75.8791];

  const routeCoords = [originCoords, destinationCoords];

  return (
    <div className="h-[70vh] w-full">
      <MapContainer center={originCoords} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={originCoords}>
          <Popup>Origin: {origin || "Rajwada"}</Popup>
        </Marker>
        <Marker position={destinationCoords}>
          <Popup>Destination: {destination || "IET DAVV"}</Popup>
        </Marker>

        <Polyline positions={routeCoords} color="blue" />
      </MapContainer>
    </div>
  );
};

export default TripMap;
