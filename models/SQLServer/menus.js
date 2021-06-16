'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Restaurants, {
        foreignKey: 'restaurantsId'
      })
      this.belongsToMany(models.Articles, { through: "MenuArticles" });
    }
  };
  Menus.init({
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Menus',
  });
  return Menus;
};
