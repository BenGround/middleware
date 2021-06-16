'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false
      },
      restaurantsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Restaurants',
          key: 'id'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Menus');
  }
};
