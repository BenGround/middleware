const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const { roles } = require("../config/roles");
const { hasRole } = require("../middleware/roleCheck");

router.get('/orders', orderControllers.getOrdersForDeliveryMan);
router.get('/orders/:idUser(\\d+)', orderControllers.getOrdersForDeliveryManToDeliver);
// router.use(hasRole(roles.ROLE_RESTAURATEUR))

module.exports = router;
