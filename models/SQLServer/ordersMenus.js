'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersMenus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.hasMany(models.Articles, {
      //   foreignKey: 'articlesId'
      // })
      // this.hasMany(models.Menus, {
      //   foreignKey: 'menusId'
      // })
    }
  };
  OrdersMenus.init({
    quantity: {
      defaultValue: 1,
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'OrdersMenus',
    timestamps: false,
  });
  return OrdersMenus;
};
