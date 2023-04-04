'use strict';

const Staff = require('../models/department');

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
        foreignKey: 'departments', 
        allowNull: true,
        name: 'department' 
      });
    }
  }
  Staff.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    isArchived: DataTypes.BOOLEAN,
    post: DataTypes.STRING,
    departments: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Departments',
        key: 'id'
      }
    } ,
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};