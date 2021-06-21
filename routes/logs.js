const express = require('express');
const router = express.Router();
const logsControllers = require('../controllers/logsControllers');

router.get('/connection', logsControllers.getConnectionLogs);

module.exports = router;