const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/all', notificationController.getNotifications);
router.get('/user/:idUser(\\d+)', notificationController.getNotificationsByUser);
router.post('/user/seen/:idUser(\\d+)', notificationController.setNotificationsAsSeenForUser);
router.post('/create', notificationController.createNotification);
router.get('/count/:idUser(\\d+)', notificationController.countNotificationsForUser);

module.exports = router;
