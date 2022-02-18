'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(
        models.Products,{
          foreignKey: 'ProductId',
          as: 'products'
        }
      )
      this.belongsTo(
        models.Orders,{
          foreignKey: 'OrdersId',
          as: 'Order'
        }
      )
      this.belongsTo(
        models.Users,{
          foreignKey: 'UserId',
          as: 'User'
        }
      )
    }
  };
  OrderDetails.init({
    OrdersId: DataTypes.UUID,
    UserId: DataTypes.UUID,
    ProductId: DataTypes.UUID,
    quantity: DataTypes.INTEGER,
    size: DataTypes.STRING,
    sum: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  OrderDetails.beforeCreate(orderDetail => orderDetail.id = uuid.v4())
  return OrderDetails;
};