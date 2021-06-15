const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/', userController.connectUser);

module.exports = router;
