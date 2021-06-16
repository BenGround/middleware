'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypesArticles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Articles, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'typesArticlesId'
      })
    }
  };
  TypesArticles.init({
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TypesArticles',
  });
  return TypesArticles;
};
