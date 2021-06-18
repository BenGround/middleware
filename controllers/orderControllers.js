const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Orders = model['Orders'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const Menus = model['Menus'];
const modelName = 'Commande';

exports.getOrders = async (req, res) => {
    await Orders.findAll(
        {
            include: [{
                model: Restaurants
            }, {
                model: Articles
            },{
                model: Menus
            }],
        }
    )
        .then(Orders => createResponse(res, true, Orders))
        .catch(error => createErrorResponse(res, error));
}

exports.getOrderById = async (req, res) => {
    await Orders.findOne(
        {
            where: { id:req.params.idOrder },
            include: [{
                model: Restaurants
            }, {
                model: Articles
            },{
                model: Menus
            }],
        }
    )
        .then(Order => {
            if (Order) {
                createResponse(res, true, Order)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.createOrder = async (req, res) => {
    let result = true;
    let restaurantId = req.body.restaurantsId;

    for (const articleId of req.body.articlesIds) {
        await Articles.findOne({ where: { id:articleId }})
            .then(Article => {
                if ((_.isNull(Article)) || !(_.isEqual(parseInt(restaurantId), parseInt(Article.restaurantsId)))) {
                    result = false;
                }
            })
    }

    for (const menuId of req.body.menusIds) {
        await Menus.findOne({ where: { id:menuId }})
            .then(Menus => {
                if (!_.isEqual(parseInt(restaurantId), parseInt(Menus.restaurantsId))) {
                    result = false;
                }
            })
    }

    if (result) {
        await Orders.create({
                userId: req.body.userId,
                restaurantsId: req.body.restaurantsId,
                ordersStatusId: req.body.ordersStatusId
            }
        )
            .then(Order => {
                for (const articleId of req.body.articlesIds) {
                    Order.addArticles(Articles.findOne({where: {id: articleId}}));
                }

                for (const menuId of req.body.menusIds) {
                    Order.addMenus(Articles.findOne({where: {id: menuId}}));
                }

                createResponse(res, true, Order, message.createObject(modelName))
            })
            .catch(error => createErrorResponse(res, error));
    } else {
        createResponse(res, false, {}, message.wrong_articles_in_order)
    }
}

exports.deleteOrder = async (req, res) => {
    await Orders.destroy({ where: { id: req.params.idOrder } })
        .then(function (isDeleted) {
            if (isDeleted) {
                createResponse(res, true)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}
