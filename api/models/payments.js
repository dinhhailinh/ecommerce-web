'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payments.init({
    paymentType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  Payments.beforeCreate(payment => payment.id = uuid.v4())
  return Payments;
};