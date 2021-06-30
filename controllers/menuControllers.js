const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Menus = model['Menus'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const MenuArticles = model['MenuArticles'];
const TypesArticles = model['TypesArticles'];
const modelName = 'Menu';

exports.getMenus = async (req, res) => {
    await Menus.findAll({
        where: { isDeleted: false },
        include: [{
            model: Restaurants
        }, {
            model: Articles,
            include: [{
                model: TypesArticles
            }]
        }], })
        .then(Menus => createResponse(res, true, Menus))
        .catch(error => createErrorResponse(res, error));
}

exports.getMenuById = async (req, res) => {
    await Menus.findOne({ where: { id:req.params.idMenu, isDeleted: false }, include: [{
            model: Restaurants
        }, {
            model: Articles,
            include: [{
                model: TypesArticles
            }]
        }] })
        .then(Menu => {
            if (Menu) {
                createResponse(res, true, Menu)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.createMenu = async (req, res) => {
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

    if (result) {
        await Menus.create({
                name: req.body.name,
                restaurantsId: req.body.restaurantsId,
                price: req.body.price
            }
        )
        .then(MenuCreated => {
            let articlesIds = req.body.articlesIds;

            if (!_.isUndefined(articlesIds) && Array.isArray(articlesIds)) {
                for (const articleId of articlesIds) {
                    Articles.findOne({where: {id: articleId}}).then(article => {
                        article.addMenus(MenuCreated)
                    });
                }
            }
            setTimeout(() => {
                Menus.findOne(
                    {
                        where: { id: MenuCreated.id },
                        include: [{
                            model: Restaurants
                        }, {
                            model: Articles
                        }],
                    }).then(Menu => {
                        createResponse(res, true, Menu, message.createObject(modelName))
                    })
            }, 1000);
        })
        .catch(error => createErrorResponse(res, error));
    } else {
        createResponse(res, false, {}, message.wrong_articles_in_order)
    }
}

exports.editMenu = async (req, res) => {
    let MenuCount = await Menus.findAndCountAll({ where: { id:req.params.idMenu, isDeleted: false } });

    if (MenuCount.count > 0) {
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

        if (result) {
            await MenuArticles.destroy({ where: { MenusId: req.params.idMenu } }).then(MenuArticles => {
                let dataToUpdate = {};

                if (req.body.name) {
                    dataToUpdate.name = req.body.name;
                } else if (req.body.restaurantsId) {
                    dataToUpdate.restaurantsId = req.body.restaurantsId;
                } else if (req.body.price) {
                    dataToUpdate.price = req.body.price;
                }

                dataToUpdate.updatedAt = Date.now();

                Menus.update(dataToUpdate, {where: {id: req.params.idMenu}})
                    .then(function (result) {

                        let articlesIds = req.body.articlesIds;

                        if (!_.isUndefined(articlesIds) && Array.isArray(articlesIds)) {
                            for (const articleId of articlesIds) {
                                Articles.findOne({where: {id: articleId}}).then(article => {
                                    article.addMenus(MenuCount.rows[0])
                                });
                            }
                        }

                        if (_.isEqual(result[0], 1)) {
                            setTimeout(() => {
                                Menus.findOne(
                                    {
                                        where: { id: req.params.idMenu },
                                        include: [{
                                            model: Restaurants
                                        }, {
                                            model: Articles
                                        }],
                                    }).then(Menu => {
                                    createResponse(res, true, Menu, message.editObject(modelName))
                                })
                            }, 1000);
                        } else {
                            createResponse(res, false, {}, message.wrong_data)
                        }
                    })
                    .catch(error => createErrorResponse(res, error));
            })
        } else {
            createResponse(res, false, {}, message.wrong_articles_in_order)
        }
    } else {
        createResponse(res, false, {}, message.notFoundObject(modelName))
    }
}

exports.deleteMenu = async (req, res) => {
    let MenuCount = await Menus.findAndCountAll({ where: { id:req.params.idMenu, isDeleted: false } });

    if (MenuCount.count > 0) {
        Menus.update({isDeleted: true,updatedAt: Date.now()}, {where: {id: req.params.idMenu}})
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

exports.getMenuByRestaurantId = async (req, res) => {
    await Menus.findAll(
        {
            where: { restaurantsId: req.params.idRestaurant, isDeleted: false },
            include: [{
                model: Restaurants
            }, {
                model: Articles,
                include: [{
                    model: TypesArticles
                }]
            }],
        }
    )
        .then(Menus => {
            if (Menus) {
                createResponse(res, true, Menus)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}
