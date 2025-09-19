import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const RoutingMachine = ({ origin, destination, busStops = [] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin[0], origin[1]),
        ...busStops.map(([lat, lng]) => L.latLng(lat, lng)),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      lineOptions: { styles: [{ color: "#6FA1EC", weight: 4 }] },
      show: true,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, origin, destination, busStops]);

  return null;
};

export default RoutingMachine;
