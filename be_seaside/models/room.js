'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Reservation, {
        foreignKey: 'room_id', as: 'reservation'
      })
    }
  }
  Room.init({
    room_number: DataTypes.STRING,
    type:{
      type: DataTypes.ENUM('standard', 'deluxe', 'suite', 'family'),
      allowNull: false, 
      validate: {
        isIn: {
          args: [['standard', 'deluxe', 'suite', 'family']],
          msg: "Type of room must one of 'standard', 'deluxe', 'suite', 'family'"
        }
      }
    },
    price: DataTypes.DECIMAL,
    status:{
      type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
      defaultValue: 'available',
      validate: {
        isIn: {
          args: [['available', 'occupied', 'maintenance']],
          msg: "Status of room must be one of 'available', 'occupied', 'maintenance'"
        }
      }
    },
    room_image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};