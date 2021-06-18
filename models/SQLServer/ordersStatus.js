'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrdersStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Orders, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'ordersStatusId'
      })
    }
  };
  OrdersStatus.init({
    name: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'OrdersStatus',
  });
  return OrdersStatus;
};
