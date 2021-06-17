const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const articleController = require("../controllers/articleControllers");
const menuController = require("../controllers/menuControllers");
const {hasRestaurateurRole} = require("../middleware/roleCheck");

router.get('/order/all', orderControllers.getOrders);
router.get('/order/:idOrder(\\d+)', orderControllers.getOrderById);
router.post('/order/delete/:idOrder(\\d+)', orderControllers.deleteOrder);

router.use(hasRestaurateurRole)

module.exports = router;
