'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Users, {
        foreignKey: 'deliveryUserId'
      })
      this.belongsTo(models.Restaurants, {
        foreignKey: 'restaurantsId'
      });
      this.belongsToMany(models.Articles, {
        through: 'OrdersArticles',
        foreignKey: 'ordersId'
      });
      this.belongsToMany(models.Menus, {
        through: 'OrdersMenus',
        foreignKey: 'ordersId'
      });
      this.belongsTo(models.OrdersStatus, {
        foreignKey: 'ordersStatusId'
      })
    }
  };
  Orders.init({
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
    modelName: 'Orders',
  });
  return Orders;
};
