'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Staffs', 'dateStart');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Staffs', 'dateStart', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
