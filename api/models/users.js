'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Addresses, {as: "Addresses"})
      this.hasMany(models.Carts, {as: "Carts"})
      this.hasMany(models.Orders, {as: "Orders"})
      this.hasMany(models.OrderDetails, {as: "OrderDetails"})
    }
  };
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.beforeCreate(user => user.id = uuid.v4())
  return Users;
};
