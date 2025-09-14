// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

import 'dotenv/config'
import { connectDB, sequelize } from './db/connection.js';
import app from "./app.js"

connectDB()
    .then(async () => { // 👈 Make this async
        // Sync all defined models to the DB.
        await sequelize.sync({ alter: true }); // 👈 Add this line
        console.log("All models were synchronized successfully.");
        
        app.listen(process.env.PORT, () => {
            console.log(`\n🚀 Server is running on the port: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Database Connection Failed !!", err)
    })




