const model = require('../models/index')
const Orders = model['Orders'];
const Restaurants = model['Restaurants'];
const Articles = model['Articles'];
const Menus = model['Menus'];
const message = require('../messages')

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
        .then(Orders => res.status(200).json(Orders))
        .catch(error => res.status(400).json({error}));
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
                res.status(200).json({'result': true, 'order': Order})
            } else {
                res.status(500).json({'result': false, 'message': 'Order not found.'})
            }
        })
        .catch(error => res.status(400).json({error}));
}

exports.createOrder = async (req, res) => {
    let result = true;
    let restaurantId = req.body.restaurantsId;

    for (const articleId of req.body.articlesIds) {
        await Articles.findOne({ where: { id:articleId }})
            .then(Article => {
                console.log(Article)
                if ((Article === null) || (parseInt(restaurantId) !== parseInt(Article.restaurantsId))) {
                    result = false;
                }
            })
    }

    for (const menuId of req.body.menusIds) {
        await Menus.findOne({ where: { id:menuId }})
            .then(Menus => {
                if (parseInt(restaurantId) !== parseInt(Menus.restaurantsId)) {
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

                res.status(200).json({
                    'order': Order,
                    'message': message.order_created_success
                })
            })
            .catch(error => res.status(400).json({error}));
    } else {
        res.status(500).json({'result': false, 'message': 'Certain(s) article(s) ou menu(s) n\'appartiennent pas au restaurant.'})
    }
}

exports.deleteOrder = async (req, res) => {
    await Orders.destroy({ where: { id: req.params.idOrder } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(500).json({'result': false, 'message': 'Order doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}
