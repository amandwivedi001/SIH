import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RoutingMachine from "../RoutingMachine";

const TripMap = ({ origin, destination }) => {
  // Fallback dummy coords if none provided
  const originCoords = origin || [22.7196, 75.8577]; // Rajwada
  const destinationCoords = destination || [22.6816, 75.8791]; // IET DAVV

  return (
    <div className="h-[70vh] w-full">
      <MapContainer center={originCoords} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={originCoords}>
          <Popup>Origin</Popup>
        </Marker>
        <Marker position={destinationCoords}>
          <Popup>Destination</Popup>
        </Marker>

        {/* Routing component */}
        <RoutingMachine origin={originCoords} destination={destinationCoords} />
      </MapContainer>
    </div>
  );
};

export default TripMap;
