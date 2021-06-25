const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Orders = model['Orders'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const Menus = model['Menus'];
const TypesArticles = model['TypesArticles'];
const OrdersStatus = model['OrdersStatus'];
const modelName = 'Commande';

exports.getOrders = async (req, res) => {
    await Orders.findAll(
        {
            where: { isDeleted: false },
            include: [{
                model: Restaurants,
                where: { isDeleted: false }
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
            },{
                model: Menus
            },
            {
                model: OrdersStatus
            }],
        }
    )
        .then(Orders => createResponse(res, true, Orders))
        .catch(error => createErrorResponse(res, error));
}

exports.getOrderById = async (req, res) => {
    await Orders.findOne(
        {
            where: { id:req.params.idOrder, isDeleted: false },
            include: [{
                model: Restaurants,
                where: { isDeleted: false }
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
            },{
                model: Menus
            },
            {
                model: OrdersStatus
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
            .then(OrderCreate => {

                if (req.body.articlesIds) {
                    for (const articleId of req.body.articlesIds) {
                        Articles.findOne({where: {id: articleId}}).then(article => {
                            article.addOrders(OrderCreate)
                        });
                    }
                }

                if (req.body.menusIds) {
                    for (const menuId of req.body.menusIds) {
                        Menus.findOne({where: {id: menuId}}).then(menu => {
                            menu.addOrders(OrderCreate)
                        });
                    }
                }

                setTimeout(() => {
                    Orders.findOne(
                        {
                            where: { id: OrderCreate.id },
                            include: [{
                                model: Restaurants
                            }, {
                                model: Articles,
                                include:[{
                                    model: TypesArticles
                                }]
                            },{
                                model: Menus
                            },
                            {
                                model: OrdersStatus
                            }],
                        }
                    )
                    .then(Order => {
                        createResponse(res, true, Order, message.createObject(modelName))
                    })
                }, 1000);
            })
            .catch(error => createErrorResponse(res, error));
    } else {
        createResponse(res, false, {}, message.wrong_articles_in_order)
    }
}

exports.deleteOrder = async (req, res) => {
    let orderCount = await Orders.findAndCountAll({ where: { id:req.params.idOrder, isDeleted: false } });

    if (orderCount.count > 0) {
        Orders.update({isDeleted: true, updatedAt: Date.now()}, {where: {id: req.params.idOrder}})
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

exports.getOrdersByUserId = async (req, res) => {
    await Orders.findAll(
        {
            where: { userId: req.params.idUser, isDeleted: false },
            include: [{
                model: Restaurants,
                where: { isDeleted: false }
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
            },{
                model: Menus
            },
            {
                model: OrdersStatus
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

exports.getOrdersForDeliveryMan = async (req, res) => {
    await Orders.findAll(
        {
            where: { ordersStatusId: 3, isDeleted: false },
            include: [{
                model: Restaurants,
                where: { isDeleted: false }
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
            },{
                model: Menus
            },
                {
                    model: OrdersStatus
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

exports.getOrdersForDeliveryManToDeliver = async (req, res) => {
    await Orders.findAll(
        {
            where: { ordersStatusId: 5, deliveryUserId: req.params.idUser, isDeleted: false },
            include: [{
                model: Restaurants,
                where: { isDeleted: false }
            }, {
                model: Articles,
                include:[{
                    model: TypesArticles
                }]
            },{
                model: Menus
            },
                {
                    model: OrdersStatus
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

    await Restaurants.findAll({where: { restaurateurId: req.params.idUser, isDeleted: false }}).then(restaurants => {
        restaurants.forEach(restaurant => {
            Orders.findAll(
                {
                    where: { restaurantsId: restaurant.id, isDeleted: false },
                    include: [{
                        model: Restaurants,
                        where: { isDeleted: false }
                    }, {
                        model: Articles,
                        include:[{
                            model: TypesArticles
                        }]
                    },{
                        model: Menus
                    },
                    {
                        model: OrdersStatus
                    }],
                }
            )
                .then(Orders => {
                    if (Orders) {
                        restaurantsOrders.push({restaurant, orders: Orders})
                    }
                })
                .catch(error => createErrorResponse(res, error));
        })

        setTimeout(() => { createResponse(res, true, restaurantsOrders) }, 1000);
    }).catch(error => createErrorResponse(res, error));
}

exports.getAllOrdersByRestaurateurId = async (req, res) => {
    let restaurantsOrders = [];

    await Restaurants.findAll({where: { restaurateurId: req.params.idUser, isDeleted: false }}).then(restaurants => {
        restaurants.forEach(restaurant => {
            Orders.findAll(
                {
                    where: { restaurantsId: restaurant.id },
                    include: [{
                        model: Restaurants,
                        where: { isDeleted: false }
                    }, {
                        model: Articles,
                        include:[{
                            model: TypesArticles
                        }]
                    },{
                        model: Menus
                    },
                        {
                            model: OrdersStatus
                        }],
                }
            )
                .then(Orders => {
                    if (Orders) {
                        restaurantsOrders.push({restaurant, orders: Orders})
                    }
                })
                .catch(error => createErrorResponse(res, error));
        })

        setTimeout(() => { createResponse(res, true, restaurantsOrders) }, 1000);
    }).catch(error => createErrorResponse(res, error));
}

exports.editOrder = async (req, res) => {
    let orderCount = await Orders.findAndCountAll({ where: { id:req.params.idOrder, isDeleted: false } });

    if (orderCount.count > 0) {
        let dataToUpdate = {};

        if (req.body.ordersStatusId) {
            dataToUpdate.ordersStatusId = req.body.ordersStatusId;
        }
        if (req.body.deliveryUserId) {
            dataToUpdate.deliveryUserId = req.body.deliveryUserId;
        }

        dataToUpdate.updatedAt = Date.now();

        Orders.update(dataToUpdate, {where: {id: req.params.idOrder}})
            .then(function (result) {
                if (_.isEqual(result[0], 1)) {
                    Orders.findOne(
                        {
                            where: { id: req.params.idOrder },
                            include: [{
                                model: Restaurants
                            }, {
                                model: Articles,
                                include:[{
                                    model: TypesArticles
                                }]
                            },{
                                model: Menus
                            },
                                {
                                    model: OrdersStatus
                                }],
                        }
                    ).then(Order => {
                        createResponse(res, true, Order, message.editObject(modelName))
                    })
                } else {
                    createResponse(res, false, {}, message.wrong_data)
                }
            })
            .catch(error => createErrorResponse(res, error));
    } else {
        createResponse(res, false, {}, message.notFoundObject(modelName))
    }
}
