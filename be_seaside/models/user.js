'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'receptionist'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['admin', 'manager', 'receptionist']],
          msg: "Role must be one of 'admin', 'manager', or 'receptionist'"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};