import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const RoutingMachine = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin[0], origin[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 4 }],
      },
      show: true, // Set to false to hide the turn-by-turn instructions
      addWaypoints: false, // Set to false to prevent users from adding more waypoints
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    // This is a cleanup function that will run when the component unmounts
    return () => map.removeControl(routingControl);
  }, [map, origin, destination]);

  return null; // This component does not render anything itself
};

export default RoutingMachine;