'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_number: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('standard', 'deluxe', 'suite', 'family'),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL
      },
      status: {
        type: Sequelize.ENUM('available', 'occupied', 'maintenance'),
        defaultValue: 'available'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};