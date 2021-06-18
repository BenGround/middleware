const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantControllers');
const articleController = require("../controllers/articleControllers");
const menuController = require("../controllers/menuControllers");
const {hasRestaurateurRole} = require("../middleware/roleCheck");

router.get('/restaurant/all', restaurantController.getRestaurants);
router.get('/restaurant/:idRestaurant(\\d+)', restaurantController.getRestaurantById);

router.get('/article/all', articleController.getArticles);
router.get('/article/:idArticle(\\d+)', articleController.getArticleById);

router.get('/menu/all', menuController.getMenus);
router.get('/menu/:idMenu(\\d+)', menuController.getMenuById);

router.use(hasRestaurateurRole)

router.post('/restaurant/create', restaurantController.createRestaurant);
router.put('/restaurant/edit/:idRestaurant(\\d+)', restaurantController.editRestaurant);
router.delete('/restaurant/delete/:idRestaurant(\\d+)', restaurantController.deleteRestaurant);

router.post('/article/create', articleController.createArticle);
router.put('/article/edit/:idArticle(\\d+)', articleController.editArticle);
router.delete('/article/delete/:idArticle(\\d+)', articleController.deleteArticle);

router.post('/menu/create', menuController.createMenu);
router.put('/menu/edit/:idMenu(\\d+)', menuController.editMenu);
router.delete('/menu/delete/:idMenu(\\d+)', menuController.deleteMenu);
router.post('/menu/add-articles/:idMenu(\\d+)', menuController.addArticle);

module.exports = router;
