import Sequelize from 'sequelize';
import { DB_NAME } from '../constants.js';

// const sequelize = new Sequelize(
//   DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres'
//   }
// );

const sequelize = new Sequelize('RouteX', 'sih', 'sih', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432 // Explicitly define the port
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connection has been established successfully to ${DB_NAME}`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

export { connectDB, sequelize };
