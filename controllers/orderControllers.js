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

exports.deleteOrder = async (req, res) => {
    await Orders.destroy({ where: { id: req.params.idOrder } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(200).json({'result': false, 'message': 'Order doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}
