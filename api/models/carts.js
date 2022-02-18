'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
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
        models.Products,{
          foreignKey: 'ProductId',
          as: 'products',
        }
      )
    }
  };
  Carts.init({
    UserId: {
      type: DataTypes.UUID,
      references: {
      model: 'Users',
      key: 'id',
    }},
    ProductId: {
      type: DataTypes.UUID,
      references: {
      model: 'Products',
      key: 'id',
    }},
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  Carts.beforeCreate(cart => cart.id = uuid.v4())
  return Carts;
};