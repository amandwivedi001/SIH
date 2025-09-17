'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    // Adds the refreshToken column to the "Commuters" table
    await queryInterface.addColumn('Commuters', 'refreshToken', {
      type: Sequelize.STRING,
      allowNull: true // It's good practice to allow null initially
    });
  },

  async down(queryInterface, Sequelize) {
    // Removes the refreshToken column from the "Commuters" table
    await queryInterface.removeColumn('Commuters', 'refreshToken');
  }
};