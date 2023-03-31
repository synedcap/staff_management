'use strict';
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
      // define association here
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