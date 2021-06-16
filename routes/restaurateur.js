const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantControllers');
const {hasRestaurateurRole} = require("../middleware/roleCheck");

router.get('/all', restaurantController.getRestaurants);
router.get('/:idRestaurant(\\d+)', restaurantController.getRestaurantById);

router.use(hasRestaurateurRole)
router.get('/create', restaurantController.createRestaurant);

module.exports = router;
