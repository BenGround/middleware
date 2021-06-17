const model = require('../models/index')
const Users = model['Users'];
const Restaurants = model['Restaurants'];
const message = require('../messages')

exports.getRestaurants = async (req, res) => {
    await Restaurants.findAll({ include: { model: Users } })
        .then(Restaurants => res.status(200).json(Restaurants))
        .catch(error => res.status(400).json({error}));
}

exports.getRestaurantById = async (req, res) => {
    await Restaurants.findOne({ include: { model: Users }, where: { id: req.params.idRestaurant } })
        .then(Restaurant => {
            if (Restaurant) {
                res.status(200).json({'result': true, 'restaurant': Restaurant})
            } else {
                res.status(500).json({'result': false, 'message': 'Restaurant not find.'})
            }
        })
        .catch(error => res.status(400).json({error}));
}

exports.createRestaurant = async (req, res) => {
    await Restaurants.create({
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            restaurateurId: req.body.restaurateurId,
            menusId: req.body.menusId
        }
    )
        .then(Restaurants => res.status(200).json({
            'restaurant': Restaurants,
            'message': message.restaurant_created_success
        }))
        .catch(error => res.status(400).json({error}));
}

exports.editRestaurant = async (req, res) => {
    let restaurantCount = await Restaurants.findAndCountAll({ where: { id:req.params.idRestaurant } });

    if (restaurantCount.count > 0) {
        let dataToUpdate = {};

        if (req.body.name) {
            dataToUpdate.name = req.body.name;
        } else if (req.body.address) {
            dataToUpdate.address = req.body.address;
        } else if (req.body.city) {
            dataToUpdate.city = req.body.city;
        } else if (req.body.restaurateurId) {
            dataToUpdate.restaurateurId = req.body.restaurateurId;
        } else if (req.body.menusId) {
            dataToUpdate.menusId = req.body.menusId;
        }

        dataToUpdate.updatedAt = Date.now();

        Restaurants.update(dataToUpdate, {where: {id: req.params.idRestaurant}})
            .then(function (result) {
                if (result[0] === 1) {
                    res.status(200).json({'result': true})
                } else {
                    res.status(500).json({'result': false, 'message': 'Data provided arn\'t right.'})
                }
            })
            .catch(error => res.status(400).json({error}));
    } else {
        res.status(500).json({'result': false, 'message': 'Restaurant not found.'});
    }
}

exports.deleteRestaurant = async (req, res) => {
    await Restaurants.destroy({ where: { id: req.params.idRestaurant } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(500).json({'result': false, 'message': 'User doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}
