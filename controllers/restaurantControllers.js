const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Users = model['Users'];
const Restaurants = model['Restaurants'];
const modelName = 'Restaurant';

exports.getRestaurants = async (req, res) => {
    await Restaurants.findAll({ include: { model: Users } })
        .then(Restaurants => createResponse(res, true, Restaurants))
        .catch(error => createErrorResponse(res, error));
}

exports.getRestaurantById = async (req, res) => {
    await Restaurants.findOne({ include: { model: Users }, where: { id: req.params.idRestaurant } })
        .then(Restaurant => {
            if (Restaurant) {
                createResponse(res, true, Restaurant)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.createRestaurant = async (req, res) => {
    await Restaurants.create({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            restaurateurId: req.body.restaurateurId,
            menusId: req.body.menusId
        }
    )
        .then(Restaurant => createResponse(res, true, Restaurant, message.createObject(modelName)))
        .catch(error => createErrorResponse(res, error));
}

exports.editRestaurant = async (req, res) => {
    let restaurantCount = await Restaurants.findAndCountAll({ where: { id:req.params.idRestaurant } });

    if (restaurantCount.count > 0) {
        let dataToUpdate = {};

        if (req.body.name) {
            dataToUpdate.name = req.body.name;
        } else if (req.body.address) {
            dataToUpdate.address = req.body.address;
        } else if (req.body.city) {
            dataToUpdate.city = req.body.city;
        } else if (req.body.restaurateurId) {
            dataToUpdate.restaurateurId = req.body.restaurateurId;
        } else if (req.body.menusId) {
            dataToUpdate.menusId = req.body.menusId;
        }

        dataToUpdate.updatedAt = Date.now();

        Restaurants.update(dataToUpdate, {where: {id: req.params.idRestaurant}})
            .then(function (result) {
                if (_.isEqual(result[0], 1)) {
                    createResponse(res, true)
                } else {
                    createResponse(res, false, {}, message.wrong_data)
                }
            })
            .catch(error => createErrorResponse(res, error));
    } else {
        createResponse(res, false, {}, message.notFoundObject(modelName))
    }
}

exports.deleteRestaurant = async (req, res) => {
    await Restaurants.destroy({ where: { id: req.params.idRestaurant } })
        .then(function (isDeleted) {
            if (isDeleted) {
                createResponse(res, true)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}
