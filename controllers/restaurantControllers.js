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
                res.status(200).json({'result': false, 'message': 'Restaurant not find.'})
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
    let userData = await Users.findOne({ where: { id:req.params.idUser } });
    let userCount = await Users.findAndCountAll({ where: { id:req.params.idUser } });

    if (userCount.count > 0) {
        let dataToUpdate = {};
        if (req.body.email) {
            dataToUpdate.email = req.body.email;
        } else if (req.body.password) {
            dataToUpdate.password = crypto.createHash("sha256").update(req.body.password).digest("hex");
        } else if (req.body.firstname) {
            dataToUpdate.firstname = req.body.firstname;
        } else if (req.body.lastname) {
            dataToUpdate.lastname = req.body.lastname;
        }

        Users.update(dataToUpdate, {where: {id: req.params.idUser}})
            .then(function (result) {
                console.log(userData)
                if (result[0] === 1) {
                    res.status(200).json({'result': true, 'user': userData})
                } else {
                    res.status(200).json({'result': false, 'message': 'Data provided arn\'t right.'})
                }
            })
            .catch(error => res.status(400).json({error}));
    } else {
        res.status(200).json({'result': false, 'message': 'User not found.'});
    }
}

exports.deleteRestaurant = async (req, res) => {
    await Users.destroy({ where: { id: req.params.idUser } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(200).json({'result': false, 'message': 'User doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}
