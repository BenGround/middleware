const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const { createErrorResponse, createResponse } = require("../services/responseService");
const Menus = model['Menus'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const MenuArticles = model['MenuArticles'];
const modelName = 'Menu';

exports.getMenus = async (req, res) => {
    await Menus.findAll({ include: [{
            model: Restaurants
        }, {
            model: Articles
        }], })
        .then(Menus => createResponse(res, true, Menus))
        .catch(error => createErrorResponse(res, error));
}

exports.getMenuById = async (req, res) => {
    await Menus.findOne({ where: { id:req.params.idMenu }, include: [{
            model: Restaurants
        }, {
            model: Articles
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
        .then(Menu => {
            let articlesIds = req.body.articlesIds;

            if (!_.isUndefined(articlesIds) && Array.isArray(articlesIds)) {
                for (const articleId of articlesIds) {
                    Articles.findOne({where: {id: articleId}}).then(article => {
                        article.addMenus(Menu)
                    });
                }
            }

            createResponse(res, true, Menu, message.createObject(modelName))
        })
        .catch(error => createErrorResponse(res, error));
    } else {
        createResponse(res, false, {}, message.wrong_articles_in_order)
    }
}

exports.editMenu = async (req, res) => {
    let MenuCount = await Menus.findAndCountAll({ where: { id:req.params.idMenu } });

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
                            createResponse(res, true)
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
    await Menus.destroy({ where: { id: req.params.idMenu } })
        .then(function (isDeleted) {
            if (isDeleted) {
                createResponse(res, true)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.getMenuByRestaurantId = async (req, res) => {
    await Menus.findAll(
        {
            where: { restaurantsId: req.params.idRestaurant },
            include: [{
                model: Restaurants
            }, {
                model: Articles
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
