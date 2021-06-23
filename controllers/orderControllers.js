const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Orders = model['Orders'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const Menus = model['Menus'];
const TypesArticles = model['TypesArticles'];
const modelName = 'Commande';

exports.getOrders = async (req, res) => {
    await Orders.findAll(
        {
            include: [{
                model: Restaurants
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
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
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
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

    if (req.body.articlesIds) {
        for (const articleId of req.body.articlesIds) {
            await Articles.findOne({ where: { id:articleId }})
                .then(Article => {
                    if ((_.isNull(Article)) || !(_.isEqual(parseInt(restaurantId), parseInt(Article.restaurantsId)))) {
                        result = false;
                    }
                })
        }
    }

    if (req.body.menusIds) {
        for (const menuId of req.body.menusIds) {
            await Menus.findOne({ where: { id:menuId }})
                .then(Menus => {
                    if (!_.isEqual(parseInt(restaurantId), parseInt(Menus.restaurantsId))) {
                        result = false;
                    }
                })
        }
    }


    if (result) {
        await Orders.create({
                userId: req.body.userId,
                restaurantsId: req.body.restaurantsId,
                ordersStatusId: req.body.ordersStatusId
            }
        )
            .then(Order => {

                if (req.body.articlesIds) {
                    for (const articleId of req.body.articlesIds) {
                        Articles.findOne({where: {id: articleId}}).then(article => {
                            article.addOrders(Order)
                        });
                    }
                }

                if (req.body.menusIds) {
                    for (const menuId of req.body.menusIds) {
                        Menus.findOne({where: {id: menuId}}).then(menu => {
                            Order.addMenus(1)
                        });
                    }
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


exports.getOrdersByUserId = async (req, res) => {
    await Orders.findAll(
        {
            where: { userId: req.params.idUser },
            include: [{
                model: Restaurants
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
            },{
                model: Menus
            }],
        }
    )
        .then(Orders => {
            if (Orders) {
                createResponse(res, true, Orders)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.getOrdersByRestaurateurId = async (req, res) => {
    let restaurantsOrders = [];

    await Restaurants.findAll({where: { restaurateurId: req.params.idUser }}).then(restaurants => {
        restaurants.forEach(restaurant => {
            Orders.findAll(
                {
                    where: { restaurantsId: restaurant.id },
                    include: [{
                        model: Restaurants
                    }, {
                        model: Articles,
                        include:[{
                            model: TypesArticles
                        }]
                    },{
                        model: Menus
                    }],
                }
            )
                .then(Orders => {
                    if (Orders) {
                        restaurantsOrders.push({restaurant: restaurant, orders: Orders})
                    }
                })
                .catch(error => createErrorResponse(res, error));
        })

        setTimeout(() => { createResponse(res, true, restaurantsOrders) }, 1000);
    }).catch(error => createErrorResponse(res, error));
}
