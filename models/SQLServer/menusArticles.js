'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuArticles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Menus, {
        foreignKey: 'menusId'
      })
      this.hasMany(models.Articles, {
        foreignKey: 'ArticlesId'
      })
    }
  };
  MenuArticles.init({
  }, {
    sequelize,
    modelName: 'MenuArticles',
  });
  return MenuArticles;
};
