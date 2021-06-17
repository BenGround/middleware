const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userControllers');

router.get('/all', userController.getUsers);
router.get('/:idUser(\\d+)', userController.getUserById);
router.get('/getByMail', userController.getUserByEmail);
router.post('/delete/:idUser(\\d+)', userController.deleteUser);
router.post('/edit/:idUser(\\d+)', userController.editUser);
router.get('/role/:idRole(\\d+)', userController.getRoleName);

module.exports = router;
