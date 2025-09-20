import fs from "fs";
import path from "path";
import mqtt from "mqtt";

const routesPath = path.resolve("./public/routes.json");
const routePoints = JSON.parse(fs.readFileSync(routesPath, "utf-8")); // directly an array

const busId = "Bus101"; // fixed, since you have one bus
const TOPIC = "bus/location";
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";

// connect to MQTT
const client = mqtt.connect(MQTT_BROKER_URL);

client.on("connect", () => {
  console.log(`✅ Connected to MQTT broker at ${MQTT_BROKER_URL}`);
});

// start simulation
let index = 0;

function updateBusLocation() {
  if (!Array.isArray(routePoints) || routePoints.length === 0) {
    console.error("❌ No route points found in routes.json");
    return;
  }

  const point = routePoints[index];
  const payload = {
    busId,
    lat: point.lat,
    lon: point.lon,
    stop: point.name,
    timestamp: Date.now(),
  };

  client.publish(TOPIC, JSON.stringify(payload));
  console.log(`📍 Sent bus location: ${point.name} (${point.lat}, ${point.lon})`);

  // handle pause if exists
  const delay = point.pause || 3000; // default 3 sec per move
  index = (index + 1) % routePoints.length;

  setTimeout(updateBusLocation, delay);
}

// kick off
updateBusLocation();
