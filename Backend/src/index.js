import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

import { connectDB } from './db/connection.js';

connectDB()
    .then( () => {
        app.listen(process.env.PORT, () => {
            console.log(`\n Server is running on the port: ${process.env.PORT}`);
            
        })
    })
    .catch((err) => {
        console.log("Database Connection Failed !!", err)
    })




