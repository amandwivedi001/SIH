import { sequelize } from "../db/connection";
import { Sequelize, DataTypes } from "sequelize";
import commuterModel from "./commuters.model.js"

const db = {};

// Load models
db.Commuter = commuterModel(sequelize, DataTypes);

// Attach the sequelize instance and Sequelize class to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;



