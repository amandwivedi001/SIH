import mqtt from "mqtt";
import { updateBusLocation } from "../controllers/busControllers.js";

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";

const TOPIC = "bus/location";

const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
  console.log(` Connected to MQTT broker at ${MQTT_BROKER_URL}`);
  mqttClient.subscribe(TOPIC, (err) => {
    if (!err) {
      console.log(` Subscribed to topic: ${TOPIC}`);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  if (topic === TOPIC) {
    try {
      const data = JSON.parse(message.toString());
      updateBusLocation(data); // send to Redis
    } catch (err) {
      console.error(" Error parsing MQTT message:", err);
    }
  }
});

mqttClient.on("error", (err) => {
  console.error(" MQTT connection error:", err);
});

export default mqttClient;
