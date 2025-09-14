// This file now exports a function that will be called by the index.js
export default (sequelize, DataTypes) => {
  const Commuter = sequelize.define("Commuter", {
    commuter_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false, // It's good practice to define nullability
      unique: true      // And constraints like uniqueness
    },
  }, {
    timestamps: true
  });

  return Commuter;
};