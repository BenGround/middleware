const express = require('express');
const router = express.Router();
const userController = require('../model/userControllers')

router.get('/users', userController.getUsers);
router.get('/user/:idUser(\\d+)', userController.getUser);
router.post('/user/create', userController.createUser);
router.post('/user/delete/:idUser(\\d+)', userController.deleteUser);

module.exports = router;
