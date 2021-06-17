const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantControllers');
const {hasRestaurateurRole} = require("../middleware/roleCheck");

router.get('/all', restaurantController.getRestaurants);
router.get('/:idRestaurant(\\d+)', restaurantController.getRestaurantById);

router.use(hasRestaurateurRole)
router.post('/create', restaurantController.createRestaurant);
router.post('/edit/:idRestaurant(\\d+)', restaurantController.editRestaurant);
router.post('/delete/:idRestaurant(\\d+)', restaurantController.deleteRestaurant);

module.exports = router;
