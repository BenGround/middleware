'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.sequelize.query('insert into roles (name) values (\'USER\'), (\'RESTAURATEUR\'), (\'LIVREUR\'), (\'DEVELOPPEUR\'), (\'COMMERCIAL\'), (\'TECHNIQUE\')')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Roles');
  }
};
