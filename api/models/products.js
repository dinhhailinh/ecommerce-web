'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(
        models.Categories,{
          foreignKey: 'CategoryId',
          as: 'category'
        }
      )
      this.hasMany(models.Carts, {as: "carts"})
    }
  };
  Products.init({
    title: DataTypes.STRING,
    productImage: DataTypes.ARRAY(DataTypes.STRING),
    desc: DataTypes.TEXT,
    CategoryId: {
      type:DataTypes.UUID,
      references: {
        model: 'Categories',
        key: 'id',
      }
    },
    gender: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    quantity: DataTypes.INTEGER,
    size: DataTypes.ARRAY(DataTypes.STRING),
    color: DataTypes.ARRAY(DataTypes.STRING),
    sold: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  Products.beforeCreate(user => user.id = uuid.v4())
  return Products;
};