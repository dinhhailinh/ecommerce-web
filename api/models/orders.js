'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(
        models.Users,{
          foreignKey: 'UserId',
          as: 'User'
        }
      )
      this.belongsTo(
        models.Payments,{
          foreignKey: 'PaymentId',
          as: 'payment'
        }
      )
      this.belongsTo(
        models.Addresses,{
          foreignKey: 'AddressId',
          as: 'Address'
        }
      )
    }
  };
  Orders.init({
    UserId: DataTypes.UUID,
    AddressId: DataTypes.UUID,
    PaymentId: DataTypes.UUID,
    status: DataTypes.STRING,
    paid: DataTypes.BOOLEAN,
    shippingAt: DataTypes.DATE,
    total: DataTypes.DECIMAL, 
    paymentAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Orders',
  });
  Orders.beforeCreate(order => order.id = uuid.v4())
  return Orders;
};
