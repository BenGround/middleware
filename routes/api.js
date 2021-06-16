const express = require('express');
const router = express.Router();
const tokenChecking = require("../middleware/tokenCheck");

router.use(tokenChecking)

module.exports = router;
