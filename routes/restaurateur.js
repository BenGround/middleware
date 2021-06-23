const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantControllers');
const articleController = require("../controllers/articleControllers");
const menuController = require("../controllers/menuControllers");
const orderControllers = require('../controllers/orderControllers');
const { roles } = require("../config/roles");
const { hasRole } = require("../middleware/roleCheck");

router.get('/restaurant/all', restaurantController.getRestaurants);
router.get('/restaurant/:idRestaurant(\\d+)', restaurantController.getRestaurantById);

router.get('/article/all', articleController.getArticles);
router.get('/article/:idArticle(\\d+)', articleController.getArticleById);
router.get('/articlesbyrestaurant/:idRestaurant(\\d+)', articleController.getArticleByRestaurantId);
router.get('/article/types', articleController.getTypesArticles);

router.get('/menu/all', menuController.getMenus);
router.get('/menu/:idMenu(\\d+)', menuController.getMenuById);
router.get('/menusbyrestaurant/:idRestaurant(\\d+)', menuController.getMenuByRestaurantId);

// router.use(hasRole(roles.ROLE_RESTAURATEUR))

router.post('/restaurant/create', restaurantController.createRestaurant);
router.put('/restaurant/edit/:idRestaurant(\\d+)', restaurantController.editRestaurant);
router.put('/restaurant/delete/:idRestaurant(\\d+)', restaurantController.deleteRestaurant);

router.post('/article/create', articleController.createArticle);
router.put('/article/edit/:idArticle(\\d+)', articleController.editArticle);
router.put('/article/delete/:idArticle(\\d+)', articleController.deleteArticle);

router.post('/menu/create', menuController.createMenu);
router.put('/menu/edit/:idMenu(\\d+)', menuController.editMenu);
router.put('/menu/delete/:idMenu(\\d+)', menuController.deleteMenu);

router.get('/orders/restaurateur/:idUser(\\d+)', orderControllers.getOrdersByRestaurateurId);
router.put('/order/edit/:idOrder(\\d+)', orderControllers.editOrder);

module.exports = router;
