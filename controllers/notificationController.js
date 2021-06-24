const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Users = model['Users'];
const Notifications = model['Notifications'];
const modelName = 'Notification';

exports.getNotifications = async (req, res) => {
    await Notifications.findAll({ include: { model: Users } })
        .then(Notifications => createResponse(res, true, Notifications))
        .catch(error => createErrorResponse(res, error));
}

exports.getNotificationsByUser = async (req, res) => {
    await Notifications.findAll(
        {
            include: [{
                model: Users,
                where: { id: req.params.idUser }
            }],
        }
    )
    .then(NotificationsGet => {
        if (NotificationsGet) {
            createResponse(res, true, NotificationsGet)
        } else {
            createResponse(res, false, {}, message.notFoundObject(modelName))
        }
    })
    .catch(error => createErrorResponse(res, error));
}

exports.setNotificationsAsSeenForUser = async (req, res) => {
    await Notifications.findAll(
        {
            where: { hasBeenSeen: false },
            include: [{
                model: Users,
                where: { id: req.params.idUser }
            }],
        }
    )
        .then(NotificationsGet => {

            NotificationsGet.forEach(item => {
                Notifications.update({ hasBeenSeen: true }, { where: { id: item.id } })
                    .catch(error => createErrorResponse(res, error));
            })

            if (NotificationsGet) {
                Notifications.findAll(
                    {
                        where: { hasBeenSeen: false },
                        include: [{
                            model: Users,
                            where: { id: req.params.idUser }
                        }],
                    }
                ).then(Notifs => createResponse(res, true, Notifs))
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.createNotification = async (req, res) => {
    await Notifications.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId,
            url: req.body.url
        },
    )
        .then(NotificationCreated => {
            Notifications.findOne({ include: { model: Users }, where: { id: NotificationCreated.id } })
                .then(Notification => {
                    createResponse(res, true, Notification, message.createObject(modelName))
                })
        })
        .catch(error => createErrorResponse(res, error));
}

exports.countNotificationsForUser = async (req, res) => {
    await Notifications.findAndCountAll(
        {
            where: { hasBeenSeen: false },
            include: [{
                model: Users,
                where: { id: req.params.idUser }
            }],
        }
    ).then(notificationsCount => {
        createResponse(res, true, notificationsCount.count)
    }).catch(error => createErrorResponse(res, error));
}
