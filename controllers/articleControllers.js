const model = require('../models/index')
const Articles = model['Articles'];
const Restaurants = model['Restaurants'];
const TypesArticles = model['TypesArticles'];
const Menus = model['Menus'];
const message = require('../messages')

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
        .then(Articles => res.status(200).json(Articles))
        .catch(error => res.status(400).json({error}));
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
                res.status(200).json({'result': true, 'menu': Article})
            } else {
                res.status(500).json({'result': false, 'message': 'Article not found.'})
            }
        })
        .catch(error => res.status(400).json({error}));
}

exports.createArticle = async (req, res) => {
    await Articles.create({
            name: req.body.name,
            typesArticlesId: req.body.typesArticlesId,
            restaurantsId: req.body.restaurantsId
        }
    )
        .then(Article => res.status(200).json({
            'article': Article,
            'message': message.article_created_success
        }))
        .catch(error => res.status(400).json({error}));
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
                if (result[0] === 1) {
                    res.status(200).json({'result': true})
                } else {
                    res.status(500).json({'result': false, 'message': 'Data provided arn\'t right.'})
                }
            })
            .catch(error => res.status(400).json({error}));
    } else {
        res.status(500).json({'result': false, 'message': 'Article not found.'});
    }
}

exports.deleteArticle = async (req, res) => {
    await Articles.destroy({ where: { id: req.params.idArticle } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(200).json({'result': false, 'message': 'Article doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}
