const model = require('../models/index')
const Menus = model['Menus'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const message = require('../messages')
const { createErrorResponse, createResponse } = require("../services/responseService");
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
    await Menus.create({
            name: req.body.name,
            restaurantsId: req.body.restaurantsId
        }
    )
        .then(Menu => createResponse(res, true, Menu, message.createObject(modelName)))
        .catch(error => createErrorResponse(res, error));
}

exports.editMenu = async (req, res) => {
    let MenuCount = await Menus.findAndCountAll({ where: { id:req.params.idMenu } });

    if (MenuCount.count > 0) {
        let dataToUpdate = {};

        if (req.body.name) {
            dataToUpdate.name = req.body.name;
        } else if (req.body.restaurantsId) {
            dataToUpdate.restaurantsId = req.body.restaurantsId;
        }

        dataToUpdate.updatedAt = Date.now();

        Menus.update(dataToUpdate, {where: {id: req.params.idMenu}})
            .then(function (result) {
                if (result[0] === 1) {
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

exports.addArticle = async (req, res) => {
    let MenuObj = await Menus.findOne({ where: { id: req.params.idMenu },include: { model: Restaurants  } })
    let articlesIds = req.body.articlesIds;

    if (articlesIds !== undefined && Array.isArray(articlesIds)) {
        for (const articleId of articlesIds) {
            MenuObj.addArticles(await Articles.findOne({where: {id: articleId}}));
        }

        createResponse(res, true, {}, message.articles_added_success)
    } else {
        createResponse(res, false, {}, message.wrong_data)
    }
}
