'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('MenuArticles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      menusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Menus',
          key: 'id'
        },
      },
      articlesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Articles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MenuArticles');
  }
};
