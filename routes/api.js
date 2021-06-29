const express = require('express');
const router = express.Router();
const tokenChecking = require("../middleware/tokenCheck");
const versionChecking = require("../middleware/versionCheck");

router.use(versionChecking)
router.use(tokenChecking)

module.exports = router;
