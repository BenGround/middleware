const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const { roles } = require("../config/roles");
const { hasRole } = require("../middleware/roleCheck");

router.get('/order/all', orderControllers.getOrders);
router.get('/order/:idOrder(\\d+)', orderControllers.getOrderById);
router.post('/order/create', orderControllers.createOrder);

// router.use(hasRole(roles.ROLE_RESTAURATEUR))

router.delete('/order/delete/:idOrder(\\d+)', orderControllers.deleteOrder);

module.exports = router;
