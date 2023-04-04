'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Staffs', 'dateStart', {
      type: Sequelize.STRING,
      allowNull: false,
      
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Staffs', 'dateStart');
  }
};
