import Redis from "ioredis";
import fs from "fs";
import path from "path";

// ----------------- LOAD ROUTE JSON -----------------
const routesPath = path.resolve("./public/routes.json");
export const routeData = JSON.parse(fs.readFileSync(routesPath, "utf-8"));

// ----------------- REDIS CLIENT -----------------
const redis = new Redis({ host: "127.0.0.1", port: 6379 });

// ----------------- UPDATE BUS LOCATION -----------------
export const updateBusLocation = async ({ busId = "Bus101", lat, lon, name }) => {
  if (!lat || !lon) return;

  try {
    await redis.hset(`bus:${busId}`, {
      latitude: lat,
      longitude: lon,
      name: name || "",
      timestamp: new Date().toISOString(),
    });

    console.log(`✅ Updated Redis for ${busId}: ${lat}, ${lon}`);
  } catch (err) {
    console.error("❌ Redis update error:", err);
  }
};

// ----------------- GET LATEST BUS LOCATION -----------------
export const getBusLocation = async (req, res) => {
  const busId = "Bus101"; // fixed since you have only one bus
  try {
    const data = await redis.hgetall(`bus:${busId}`);

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ message: `${busId} not found` });
    }

    res.json({
      busId,
      lat: parseFloat(data.latitude),
      lon: parseFloat(data.longitude),
      name: data.name,
      timestamp: data.timestamp,
    });
  } catch (err) {
    console.error("❌ API error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ----------------- GET FULL ROUTE -----------------
export const getBusRoute = (req, res) => {
  res.json({ busId: "Bus101", route: routeData });
};
