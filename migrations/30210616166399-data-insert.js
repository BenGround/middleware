'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.query('insert into roles (name) values (\'USER\'), (\'RESTAURATEUR\'), (\'LIVREUR\'), (\'DEVELOPPEUR\'), (\'COMMERCIAL\'), (\'TECHNIQUE\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, roleId) values (\'ben@gmail.ocm\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', 2)')
    await queryInterface.sequelize.query('insert into TypesArticles (name) values (\'PLAT\'), (\'BOISSON\'), (\'SAUCE\'), (\'ACCOMPAGNEMENT\')')
    await queryInterface.sequelize.query('insert into Restaurants (name, address, city, restaurateurId) values (\'Restaurant test\', \'1 rue rémi\', \'Nantes\', 1)')
    await queryInterface.sequelize.query('insert into Articles (name, typesArticlesId, restaurantsId) values (\'viance\', 1, 1)')
    await queryInterface.sequelize.query('insert into Menus (name, restaurantsId) values (\'Menu Vegan\', 1)')
    await queryInterface.sequelize.query('insert into MenusArticles (menusId, articlesId) values (1, 1)')
  },
  down: async (queryInterface, Sequelize) => {
  }
};
