import { sequelize } from "../db/connection.js";
import { Sequelize, DataTypes } from "sequelize";
import commuterModel from "./commuters.model.js"
import otpModel from "./otp.model.js"

const db = {};

// Load models
db.Commuter = commuterModel(sequelize, DataTypes);
db.Otp = otpModel(sequelize, DataTypes);

// Attach the sequelize instance and Sequelize class to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;



