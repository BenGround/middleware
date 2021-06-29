const express = require('express');
const router = express.Router();
const tokenChecking = require("../middleware/tokenCheck");
const versionChecking = require("../middleware/versionCheck");
const menuController = require("../controllers/menuControllers");
const orderControllers = require("../controllers/orderControllers");
const articleController = require("../controllers/articleControllers");
const restaurantController = require("../controllers/restaurantControllers");
const componentsControllers = require("../controllers/componentsControllers");
const logsControllers = require("../controllers/logsControllers");
const userController = require("../controllers/userControllers");
const notificationController = require("../controllers/notificationController");
const {canDeleteOrEditUser} = require("../middleware/roleCheck");
const {roles} = require("../config/roles");
const {hasRoles} = require("../middleware/roleCheck");

router.use(versionChecking)

router.post('/user-connect', userController.connectUser);
router.post('/user-register', userController.createUser);
router.get('/getByReferralCode/:referralCode', userController.getUserByReferralCode);

router.use(tokenChecking)

router.get('/user/:idUser(\\d+)', userController.getUserById);
router.get('/user/getByMail', userController.getUserByEmail);
router.get('/user/getUsersReferred/:idUser(\\d+)', userController.getUsersReferredByUserId);
router.get('/user/role/:idRole(\\d+)', userController.getRoleName);
router.get('/notifications/all', notificationController.getNotifications);
router.get('/notifications/user/:idUser(\\d+)', notificationController.getNotificationsByUser);
router.post('/notifications/user/seen/:idUser(\\d+)', notificationController.setNotificationsAsSeenForUser);
router.post('/notifications/create', notificationController.createNotification);
router.get('/notifications/count/:idUser(\\d+)', notificationController.countNotificationsForUser);
router.get('/ordersbyuser/:idUser(\\d+)', orderControllers.getOrdersByUserId);
router.get('/order/:idOrder(\\d+)', orderControllers.getOrderById);
router.post('/order/create', orderControllers.createOrder);
router.put('/order/edit/:idOrder(\\d+)', orderControllers.editOrder);
router.get('/restaurant/all', restaurantController.getRestaurants);
router.get('/restaurant/:idRestaurant(\\d+)', restaurantController.getRestaurantById);
router.get('/article/all', articleController.getArticles);
router.get('/article/:idArticle(\\d+)', articleController.getArticleById);
router.get('/articlesbyrestaurant/:idRestaurant(\\d+)', articleController.getArticleByRestaurantId);
router.get('/article/types', articleController.getTypesArticles);
router.get('/menu/all', menuController.getMenus);
router.get('/menu/:idMenu(\\d+)', menuController.getMenuById);
router.get('/menusbyrestaurant/:idRestaurant(\\d+)', menuController.getMenuByRestaurantId);

// router.use(hasRoles([roles.ROLE_COMMERCIAL]))
router.get('/user/all', hasRoles([roles.ROLE_COMMERCIAL]), userController.getUsers);
router.get('/order/all', hasRoles([roles.ROLE_COMMERCIAL]), orderControllers.getOrders);

// router.use(hasRoles([roles.ROLE_TECHNIQUE, roles.ROLE_DEVELOPPEUR]))
router.get('/all/component', hasRoles([roles.ROLE_TECHNIQUE, roles.ROLE_DEVELOPPEUR]), componentsControllers.getAllComponents);
router.post('/download/component', hasRoles([roles.ROLE_TECHNIQUE, roles.ROLE_DEVELOPPEUR]), componentsControllers.createDownloadComponentLog);

// router.use(hasRoles([roles.ROLE_LIVREUR]))
router.get('/deliveryman/orders', hasRoles([roles.ROLE_LIVREUR]), orderControllers.getOrdersForDeliveryMan);
router.get('/deliveryman/orders/:idUser(\\d+)', hasRoles([roles.ROLE_LIVREUR]), orderControllers.getOrdersForDeliveryManToDeliver);

// router.use(hasRoles([roles.ROLE_TECHNIQUE]))
router.get('/logs/connection', hasRoles([roles.ROLE_TECHNIQUE]), logsControllers.getConnectionLogs);
router.get('/logs/download', hasRoles([roles.ROLE_TECHNIQUE]), logsControllers.getDownloadLogs);
router.post('/component/create', hasRoles([roles.ROLE_TECHNIQUE]), componentsControllers.createComponent);
router.put('/component/edit/:idComponent', hasRoles([roles.ROLE_TECHNIQUE]), componentsControllers.editComponent);
router.delete('/component/delete/:idComponent', hasRoles([roles.ROLE_TECHNIQUE]), componentsControllers.deleteComponent);

// router.use(hasRoles([roles.ROLE_RESTAURATEUR]))
router.post('/restaurant/create', hasRoles([roles.ROLE_RESTAURATEUR]), restaurantController.createRestaurant);
router.put('/restaurant/edit/:idRestaurant(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR]), restaurantController.editRestaurant);
router.put('/restaurant/delete/:idRestaurant(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR]), restaurantController.deleteRestaurant);
router.post('/article/create', hasRoles([roles.ROLE_RESTAURATEUR]), articleController.createArticle);
router.put('/article/edit/:idArticle(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR]), articleController.editArticle);
router.put('/article/delete/:idArticle(\\d+)', articleController.deleteArticle);
router.post('/menu/create', hasRoles([roles.ROLE_RESTAURATEUR]), menuController.createMenu);
router.put('/menu/edit/:idMenu(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR]), menuController.editMenu);
router.put('/menu/delete/:idMenu(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR]), menuController.deleteMenu);

// router.use(hasRoles([roles.ROLE_RESTAURATEUR, roles.ROLE_COMMERCIAL]))
router.get('/orders/restaurateur/:idUser(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR, roles.ROLE_COMMERCIAL]), orderControllers.getOrdersByRestaurateurId);
router.get('/all/orders/restaurateur/:idUser(\\d+)', hasRoles([roles.ROLE_RESTAURATEUR, roles.ROLE_COMMERCIAL]), orderControllers.getAllOrdersByRestaurateurId);

router.put('/user/delete/:idUser(\\d+)', canDeleteOrEditUser, userController.deleteUser);
router.put('/user/edit/:idUser(\\d+)', canDeleteOrEditUser, userController.editUser);

module.exports = router;
