// simulator.js → Publisher
import mqtt from "mqtt";

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://127.0.0.1:1883";
const BUS_ID = "PB06AB";
const TOPIC = "bus/location";

const client = mqtt.connect(MQTT_BROKER_URL);

client.on("connect", () => {
  console.log(`✅ Simulator connected to MQTT broker at ${MQTT_BROKER_URL}`);

  setInterval(() => {
    const fakeData = {
      busId: BUS_ID,
      latitude: (30.7046 + Math.random() * 0.01).toFixed(6),
      longitude: (76.7179 + Math.random() * 0.01).toFixed(6),
      timestamp: Date.now(),
    };

    client.publish(TOPIC, JSON.stringify(fakeData));
    console.log(`📡 Published: ${JSON.stringify(fakeData)}`);
  }, 5000);
});

client.on("error", (err) => {
  console.error("❌ Simulator MQTT error:", err);
});
