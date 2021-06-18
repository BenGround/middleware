const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const { hasRestaurateurRole } = require("../middleware/roleCheck");

router.get('/order/all', orderControllers.getOrders);
router.get('/order/:idOrder(\\d+)', orderControllers.getOrderById);
router.post('/order/create', orderControllers.createOrder);

router.use(hasRestaurateurRole)

router.delete('/order/delete/:idOrder(\\d+)', orderControllers.deleteOrder);

module.exports = router;
