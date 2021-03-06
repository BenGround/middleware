'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.TypesArticles, {
        foreignKey: 'typesArticlesId'
      })
      this.belongsTo(models.Restaurants, {
        foreignKey: 'restaurantsId'
      })
      this.belongsToMany(models.Menus, {
        through: "MenuArticles",
        foreignKey: 'articlesId'
      });
      this.belongsToMany(models.Orders, {
        through: 'OrdersArticles',
        foreignKey: 'articlesId'
      });
    }
  };
  Articles.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    isDeleted: {
      defaultValue: 0,
      type: DataTypes.BOOLEAN,
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
    modelName: 'Articles',
  });
  return Articles;
};
