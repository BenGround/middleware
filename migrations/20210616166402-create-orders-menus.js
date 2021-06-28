'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('OrdersMenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      ordersId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
      },
      menusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Menus',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity: {
        defaultValue: 1,
        type: DataTypes.FLOAT,
        allowNull: false
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrdersMenus');
  }
};
