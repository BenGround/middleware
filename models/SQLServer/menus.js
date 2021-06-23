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
      this.belongsToMany(models.Articles, {
        through: 'MenuArticles',
        foreignKey: 'menusId'
      });
      this.belongsToMany(models.Orders, {
        through: 'OrdersMenus',
        foreignKey: 'menusId'
      });
    }
  };
  Menus.init({
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Menus',
  });
  return Menus;
};
