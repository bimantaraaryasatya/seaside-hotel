'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Guest, {
        foreignKey: 'guest_id',
        as: 'guest'
      })
      this.belongsTo(models.Room, {
        foreignKey: 'room_id', 
        as: 'room'
      })
      this.hasOne(models.Payment, {
        foreignKey: 'reservation_id', as: 'payment'
      })
    }
  }
  Reservation.init({
    guest_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    status:{
      type: DataTypes.ENUM('booked', 'checked_in', 'checked_out', 'canceled'),
      defaultValue: 'booked',
      validate: {
        isIn: {
          args: [['booked', 'checked_in', 'checked_out', 'canceled']],
          msg: "Status of reservation must be one of 'booked', 'checked_in', 'checked_out', 'canceled'"
        }
      }
    },
    total_price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};