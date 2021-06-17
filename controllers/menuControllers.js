const model = require('../models/index')
const Menus = model['Menus'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const message = require('../messages')

exports.getMenus = async (req, res) => {
    await Menus.findAll({ include: [{
            model: Restaurants
        }, {
            model: Articles
        }], })
        .then(Menus => res.status(200).json(Menus))
        .catch(error => res.status(400).json({error}));
}

exports.getMenuById = async (req, res) => {
    await Menus.findOne({ where: { id:req.params.idMenu }, include: [{
            model: Restaurants
        }, {
            model: Articles
        }] })
        .then(Menu => {
            if (Menu) {
                res.status(200).json({'result': true, 'menu': Menu})
            } else {
                res.status(500).json({'result': false, 'message': 'Menu not found.'})
            }
        })
        .catch(error => res.status(400).json({error}));
}

exports.createMenu = async (req, res) => {
    await Menus.create({
            name: req.body.name,
            restaurantsId: req.body.restaurantsId
        }
    )
        .then(Menu => res.status(200).json({
            'menu': Menu,
            'message': message.menu_created_success
        }))
        .catch(error => res.status(400).json({error}));
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
                    res.status(200).json({'result': true})
                } else {
                    res.status(500).json({'result': false, 'message': 'Data provided arn\'t right.'})
                }
            })
            .catch(error => res.status(400).json({error}));
    } else {
        res.status(500).json({'result': false, 'message': 'Menu not found.'});
    }
}

exports.deleteMenu = async (req, res) => {
    await Menus.destroy({ where: { id: req.params.idMenu } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(500).json({'result': false, 'message': 'Menu doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}

exports.addArticle = async (req, res) => {
    let MenuObj = await Menus.findOne({ where: { id: req.params.idMenu },include: { model: Restaurants  } })

    let articlesIds = req.body.articlesIds;

    if (articlesIds !== undefined && Array.isArray(articlesIds)) {
        for (const articleId of articlesIds) {
            MenuObj.addArticles(await Articles.findOne({where: {id: articleId}}));
        }

        res.status(200).json({'result': true, 'message': 'Les article(s) ont été ajoutée(s)'})
    } else {
        res.status(500).json({'result': false, 'message': 'Bad information given.'})
    }
}
