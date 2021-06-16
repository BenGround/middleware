const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');

router.post('/', userController.connectUser);

module.exports = router;
