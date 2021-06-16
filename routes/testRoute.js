const express = require('express');
const router = express.Router();
const testController = require('../controllers/testControllers');

router.get('/', testController.test2);

module.exports = router;
