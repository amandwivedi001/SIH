import express from "express";
import { getBusLocation } from "../controllers/busControllers.js";

const router = express.Router();


router.get("/:busId", async (req, res) => {
  const { busId } = req.params;

  try {
    const busData = await getBusLocation(busId);

    if (!busData) {
      return res.status(404).json({ message: `No data found for bus ${busId}` });
    }

    res.json({
      busId,
      latitude: busData.latitude,
      longitude: busData.longitude,
      timestamp: busData.timestamp,
    });
  } catch (err) {
    console.error(" API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
