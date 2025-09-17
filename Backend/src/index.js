// server.js

import 'dotenv/config'

console.log('DB USER:', process.env.DB_USERNAME);
console.log('DB HOST:', process.env.DB_HOST);
// console.log('DB PORT:', process.env.DB_PORT);


import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import Redis from "ioredis";
// import "../config/mqtt.js";; 
import { connectDB, sequelize } from './db/connection.js';
import app from "./app.js"; // if you have separate routes/middleware
// import "../simulator/simulator.js"




connectDB()
    .then(async () => { // 👈 Make this async      
        app.listen(process.env.PORT, () => {
            console.log(`\n🚀 Server is running on the port: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Database Connection Failed !!", err)
    })
// // ✅ Use the app from app.js or define here, but not both!
const server = express();
 server.use(bodyParser.json());

// // ✅ Redis connection
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


