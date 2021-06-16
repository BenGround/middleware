const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

router.get('/users', userController.getUsers);
router.get('/user/:idUser(\\d+)', userController.getUserById);
router.get('/user/getByMail', userController.getUserByEmail);
router.post('/user/create', userController.createUser);
router.post('/user/delete/:idUser(\\d+)', userController.deleteUser);
router.post('/user/edit/:idUser(\\d+)', userController.editUser);

module.exports = router;
