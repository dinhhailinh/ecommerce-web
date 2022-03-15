'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid')
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Products, {as: "Products"})
    }
  };
  Categories.init({
    cateName: DataTypes.STRING,
    cateImage: DataTypes.STRING,
    cateSlug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categories',
  });
  Categories.beforeCreate(category => category.id = uuid.v4())
  return Categories;
};