'use strict';

const Department = require('../models/department');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Staff.belongsTo(models.Department, {
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull: false,
        name: 'departmentId'
      });
    }
  }
  Staff.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    dateOfStart: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    isArchived: DataTypes.BOOLEAN,
    post: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};