'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'restaurateurId'
      })
      this.hasMany(models.Menus, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'restaurantsId',
        onDelete: 'cascade'
      })
      this.hasMany(models.Articles, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'restaurantsId',
        onDelete: 'cascade'
      })
      this.hasMany(models.Orders, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'restaurantsId',
        onDelete: 'cascade'
      })
    }
  };
  Restaurants.init({
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Restaurants',
  });
  return Restaurants;
};
