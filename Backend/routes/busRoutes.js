import express from "express";
import { redisClient } from "../src/app.js";
import { routeData } from "../controllers/busControllers.js";

const router = express.Router();
const BUS_ID = "Bus101"; // single bus constant

// ----------------- Latest location -----------------
router.get("/location", async (req, res) => {
  try {
    const data = await redisClient.hgetall(`bus:${BUS_ID}`);

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ message: `${BUS_ID} not found` });
    }

    res.json({
      busId: BUS_ID,
      lat: parseFloat(data.latitude),
      lon: parseFloat(data.longitude),
      name: data.name,
      timestamp: data.timestamp,
    });
  } catch (err) {
    console.error("❌ API error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ----------------- Full route -----------------
router.get("/route", (req, res) => {
  res.json({ busId: BUS_ID, route: routeData });
});

export default router;
