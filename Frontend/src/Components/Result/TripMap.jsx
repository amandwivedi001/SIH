import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import RoutingMachine from "../RoutingMachine";

const TripMap = ({ origin, destination, busStops = [], liveBusLocation }) => {
  const originCoords = origin || [22.7295, 75.8762]; // IET DAVV
  const destinationCoords = destination || [22.6857, 75.8732]; // IT Park

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

        {busStops.map((stop, idx) => (
          <Marker key={idx} position={stop}>
            <Popup>Bus Stop {idx + 1}</Popup>
          </Marker>
        ))}

        {/* Live moving bus */}
        {liveBusLocation && (
          <Marker position={[liveBusLocation.lat, liveBusLocation.lon]}>
            <Popup>
              {liveBusLocation.busName} <br />
              Next Stop: {liveBusLocation.nextStop} <br />
              ETA: {liveBusLocation.eta} mins
            </Popup>
          </Marker>
        )}

        <RoutingMachine origin={originCoords} destination={destinationCoords} busStops={busStops} />
      </MapContainer>
    </div>
  );
};

export default TripMap;
