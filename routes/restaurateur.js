const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantControllers');
const articleController = require("../controllers/articleControllers");
const menuController = require("../controllers/menuControllers");
const {hasRestaurateurRole} = require("../middleware/roleCheck");

router.get('/restaurant/all', restaurantController.getRestaurants);
router.get('/restaurant/:idRestaurant(\\d+)', restaurantController.getRestaurantById);

router.get('/article/all', articleController.getArticles);
router.get('/article/:idRestaurant(\\d+)', articleController.getArticleById);

router.get('/menu/all', menuController.getMenus);
router.get('/menu/:idRestaurant(\\d+)', menuController.getMenuById);

router.use(hasRestaurateurRole)

router.post('/restaurant/create', restaurantController.createRestaurant);
router.post('/restaurant/edit/:idRestaurant(\\d+)', restaurantController.editRestaurant);
router.post('/restaurant/delete/:idRestaurant(\\d+)', restaurantController.deleteRestaurant);

router.post('/article/create', articleController.createArticle);
router.post('/article/edit/:idArticle(\\d+)', articleController.editArticle);
router.post('/article/delete/:idArticle(\\d+)', articleController.deleteArticle);

router.post('/menu/create', menuController.createMenu);
router.post('/menu/edit/:idMenu(\\d+)', menuController.editMenu);
router.post('/menu/delete/:idMenu(\\d+)', menuController.deleteMenu);
router.post('/menu/add-articles/:idMenu(\\d+)', menuController.addArticle);

module.exports = router;
