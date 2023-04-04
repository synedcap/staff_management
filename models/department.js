'use strict';
const Staff = require('../models/staff');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Department.hasMany(models.Staff, {
        foreignKey: 'departments', 
        name: 'staff' 
      });

    }
  }
  Department.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    label: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department',
  });
  return Department;
};