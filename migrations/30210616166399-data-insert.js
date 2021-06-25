'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.sequelize.query('insert into roles (name) values (\'User\'), (\'Restaurateur\'), (\'Livreur\'), (\'Developpeur\'), (\'Commercial\'), (\'Technique\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'ben@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 2, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d4\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'User@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 1, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d5\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'Restaurateur@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 2, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d3\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'Livreur@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 3, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d6\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'Developpeur@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 4, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d7\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'Commercial@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 5, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d8\')')
    await queryInterface.sequelize.query('insert into users (email, password, firstname, lastname, address, city, roleId, referralCode) values (\'Technique@gmail.com\', \'03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\', \'ben\', \'ben\', \'1 rue test\', \'Paris\', 6, \'837758f2-4c0a-43e2-9b0a-7d2a1b23d9\')')
    await queryInterface.sequelize.query('insert into TypesArticles (name) values (\'Plat\'), (\'Boisson\'), (\'Sauce\'), (\'Accompagnement\')')
    await queryInterface.sequelize.query('insert into Restaurants (name, address, city, restaurateurId) values (\'Restaurant test\', \'1 rue rémi\', \'Nantes\', 1)')
    await queryInterface.sequelize.query('insert into Articles (name, typesArticlesId, restaurantsId, price) values (\'viance\', 1, 1, 10.2)')
    await queryInterface.sequelize.query('insert into Menus (name, restaurantsId, price) values (\'Menu Vegan\', 1, 10.4)')
    await queryInterface.sequelize.query('insert into MenuArticles (menusId, articlesId) values (1, 1)')

    await queryInterface.sequelize.query('insert into Restaurants (name, address, city, restaurateurId) values (\'Restaurant 2\', \'1 rue rémi\', \'Nantes\', 2)')
    await queryInterface.sequelize.query('insert into Articles (name, typesArticlesId, restaurantsId, price) values (\'kebab\', 2, 2, 15.2)')
    await queryInterface.sequelize.query('insert into Articles (name, typesArticlesId, restaurantsId, price) values (\'frite\', 1, 2, 5.2)')
    await queryInterface.sequelize.query('insert into Menus (name, restaurantsId, price) values (\'Menu Kebab\', 2, 10.4)')
    await queryInterface.sequelize.query('insert into MenuArticles (menusId, articlesId) values (2, 2)')
    await queryInterface.sequelize.query('insert into MenuArticles (menusId, articlesId) values (2, 3)')
    await queryInterface.sequelize.query('insert into OrdersStatus (name) values (\'Créée\'), (\'Validée\'), (\'Refusée\'), (\'En livraison\'), (\'Livrée\')')
    // await queryInterface.sequelize.query('insert into Orders (restaurantsId, userId, ordersStatusId) values (1, 1, 1)')
    // await queryInterface.sequelize.query('insert into OrdersArticles (ordersId, articlesId) values (1, 1)')
    // await queryInterface.sequelize.query('insert into OrdersMenus (ordersId, menusId) values (1, 1)')
  },
  down: async (queryInterface, Sequelize) => {
  }
};
