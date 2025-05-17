'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE Guests
      ADD COLUMN password VARCHAR(255) NOT NULL AFTER email;
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Guests', 'password');
  }
};
