// server.js

import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import Redis from "ioredis";
import "../config/mqtt.js";; 
import { connectDB, sequelize } from './db/connection.js';
import app from "./app.js"; // if you have separate routes/middleware

// ✅ Use the app from app.js or define here, but not both!
const server = express();
server.use(bodyParser.json());

// ✅ Redis connection
const client = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

client.on("connect", () => {
  console.log("✅ Connected to Redis");
});

client.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

// ✅ API Route to fetch bus location
server.get("/bus/:id", async (req, res) => {
  try {
    const busId = req.params.id;
    const data = await client.hgetall(`bus:${busId}`);
    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start DB + server
// connectDB()
//   .then(async () => {
//     await sequelize.sync({ alter: true });
//     console.log("✅ All models were synchronized successfully.");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
//   })
//   .catch((err) => {
//     console.log("❌ Database Connection Failed !!", err);
//   });
