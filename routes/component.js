const express = require('express');
const router = express.Router();
const componentsControllers = require('../controllers/componentsControllers');

router.get('/all', componentsControllers.getAllComponents);
router.post('/create', componentsControllers.createComponent);
router.post('/download', componentsControllers.createDownloadComponentLog);
router.put('/edit/:idComponent', componentsControllers.editComponent);
router.delete('/delete/:idComponent', componentsControllers.deleteComponent);

module.exports = router;
