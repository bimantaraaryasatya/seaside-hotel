'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Rooms
      ADD COLUMN room_image VARCHAR(255) NOT NULL AFTER status;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Rooms', 'room_image');
  }
};
