'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
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
          as: 'user'
        }
      )
    }
  };
  Addresses.init({
    UserId: {
      type: DataTypes.UUID,
      references: {
      model: 'Users',
      key: 'id',
    }},
    address: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  Addresses.beforeCreate(address => address.id = uuid.v4())
  return Addresses;
};
