'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Reservation)
    }
  }
  Payment.init({
    reservation_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    payment_method:{
      type: DataTypes.ENUM('cash', 'credit_card', 'debit_card', 'bank_transfer'),
      allowNull: false
    },
    payment_status:{
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending'
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};