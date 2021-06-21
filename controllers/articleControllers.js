const model = require('../models/index')
const message = require('../config/messages')
const _ = require('lodash')
const {createErrorResponse, createResponse} = require("../services/responseService");
const Articles = model['Articles'];
const Restaurants = model['Restaurants'];
const TypesArticles = model['TypesArticles'];
const Menus = model['Menus'];
const modelName = 'Article';

exports.getArticles = async (req, res) => {
    await Articles.findAll(
        {
            include: [{
                model: Restaurants
            }, {
                model: TypesArticles
            },{
                model: Menus
            }],
        }
    )
        .then(Articles => createResponse(res, true, Articles))
        .catch(error => createErrorResponse(res, error));
}


exports.getArticleById = async (req, res) => {
    await Articles.findOne(
        {
            where: { id:req.params.idArticle },
            include: [{
                model: Restaurants
            }, {
                model: TypesArticles
            },{
                model: Menus
            }],
        }
    )
        .then(Article => {
            if (Article) {
                createResponse(res, true, Article)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.createArticle = async (req, res) => {
    await Articles.create({
            name: req.body.name,
            typesArticlesId: req.body.typesArticlesId,
            restaurantsId: req.body.restaurantsId
        }
    )
        .then(Article => createResponse(res, true, Article, message.createObject(modelName)))
        .catch(error => createErrorResponse(res, error));
}

exports.editArticle = async (req, res) => {
    let articleCount = await Articles.findAndCountAll({ where: { id:req.params.idArticle } });

    if (articleCount.count > 0) {
        let dataToUpdate = {};

        if (req.body.name) {
            dataToUpdate.name = req.body.name;
        } else if (req.body.typesArticlesId) {
            dataToUpdate.typesArticlesId = req.body.typesArticlesId;
        } else if (req.body.restaurantsId) {
            dataToUpdate.restaurantsId = req.body.restaurantsId;
        }

        dataToUpdate.updatedAt = Date.now();

        Articles.update(dataToUpdate, {where: {id: req.params.idArticle}})
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

exports.deleteArticle = async (req, res) => {
    await Articles.destroy({ where: { id: req.params.idArticle } })
        .then(function (isDeleted) {
            if (isDeleted) {
                createResponse(res, true)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.getArticleByRestaurantId = async (req, res) => {
    await Articles.findAll(
        {
            where: { restaurantsId: req.params.idRestaurant },
            include: [{
                model: Restaurants
            }, {
                model: TypesArticles
            },{
                model: Menus
            }],
        }
    )
        .then(Articles => {
            if (Articles) {
                createResponse(res, true, Articles)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}
