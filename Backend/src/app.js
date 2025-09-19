import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Redis from "ioredis";
import busRoutes from "../routes/busRoutes.js";
import { authRoute } from "./routes/auth.route.js";

const app = express();

// ----------------- MIDDLEWARES -----------------
app.use(cors({
  origin: process.env.CORS_OPTIONS, // frontend origin (e.g. "http://localhost:3000")
  credentials: true                  // allow cookies
}));

app.use(express.json());               // parse JSON body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));     // serve static files
app.use(cookieParser());

// ----------------- REDIS CLIENT -----------------
export const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379
});

redisClient.on("connect", () => console.log("✅ Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));

// ----------------- INITIALIZE DEFAULT BUS -----------------
const BUS_ID = "Bus101";

(async () => {
  try {
    const exists = await redisClient.exists(`bus:${BUS_ID}`);
    if (!exists) {
      await redisClient.hset(`bus:${BUS_ID}`, {
        latitude: 22.668545,    // starting point: Limbodi
        longitude: 75.882035,
        name: "Limbodi",
        timestamp: new Date().toISOString(),
      });
      console.log(`✅ Initialized ${BUS_ID} in Redis with default location`);
    }
  } catch (err) {
    console.error("❌ Failed to initialize bus in Redis:", err);
  }
})();

// ----------------- ROUTES -----------------
app.use("/api/bus", busRoutes);       // All bus routes under /api/bus
app.use("/api/v1/auth", authRoute);

export default app;
