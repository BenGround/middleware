const express = require('express');
const router = express.Router();
const componentsControllers = require('../controllers/componentsControllers');

router.get('/all', componentsControllers.getAllComponents);
router.post('/create', componentsControllers.createComponent);
router.put('/edit/:idComponent', componentsControllers.editComponent);

module.exports = router;
