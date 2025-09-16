'use strict';
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Commuters', 'email', {
      type: Sequelize.STRING,
      allowNull: true, // Or false if you require it
      unique: true,
      validate: {
        isEmail: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Commuters', 'email');
  }
};