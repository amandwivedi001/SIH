import { DataTypes } from "sequelize";
import { sequelize } from "../db/connection.js"

const Commuter = sequelize.define("Commuter", {
        commuter_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phone: DataTypes.TEXT,
    },{
        timestamps: true
    });

export default Commuter;