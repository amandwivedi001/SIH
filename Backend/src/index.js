// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

import 'dotenv/config'

console.log('DB USER:', process.env.DB_USERNAME);
console.log('DB HOST:', process.env.DB_HOST);
// console.log('DB PORT:', process.env.DB_PORT);


import { connectDB, sequelize } from './db/connection.js';
import app from "./app.js"




connectDB()
    .then(async () => { // 👈 Make this async      
        app.listen(process.env.PORT, () => {
            console.log(`\n🚀 Server is running on the port: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Database Connection Failed !!", err)
    })




