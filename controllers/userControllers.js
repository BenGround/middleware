const user = require('../models/user')
const crypto = require('crypto')
const _ = require('lodash')
const tokenService = require('../services/tokenService')

exports.getUsers = async (req, res) => {
    await user.findAll()
        .then(Users => res.status(200).json(Users))
        .catch(error => res.status(400).json({error}));
}

exports.getUserById = async (req, res) => {
    await user.findOne({ where: { id: req.params.idUser } })
        .then(User => {
            if (User) {
                res.status(200).json({'result': true, 'user': User})
            } else {
                res.status(200).json({'result': false, 'message': 'User not find.'})
            }
        })
    .catch(error => res.status(400).json({error}));
}

exports.getUserByEmail = async (req, res) => {
    await user.findOne({ where: { email: req.body.email } })
        .then(User => {
            if (User) {
                res.status(200).json({'result': true, 'user': User})
            } else {
                res.status(200).json({'result': false, 'message': 'User not find.'})
            }
        })
        .catch(error => res.status(400).json({error}));
}

exports.createUser = async (req, res) => {
    await user.create({
            email: req.body.email,
            password: crypto.createHash("sha256").update(req.body.password).digest("hex"),
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    )
    .then(User => res.status(200).json({'user': User, 'token': tokenService.createJWT(User.id)}))
    .catch(error => res.status(400).json({error}));
}

exports.editUser = async (req, res) => {
    let userData = await user.findOne({ where: { id:req.params.idUser } });
    let userCount = await user.findAndCountAll({ where: { id:req.params.idUser } });

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

        user.update(dataToUpdate, {where: {id: req.params.idUser}})
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

exports.deleteUser = async (req, res) => {
    await user.destroy({ where: { id: req.params.idUser } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(200).json({'result': false, 'message': 'User doesn\'t exist'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}

exports.connectUser = async (req, res) => {
    const Users = await user.findAndCountAll({ where: { email: req.body.email } });

    if (Users.count > 0) {
        const userPassword = Users.rows[0].password;
        const password = crypto.createHash("sha256").update(req.body.password).digest("hex")

        if (_.isEqual(password, userPassword)) {
            let token = tokenService.createJWT(Users.rows[0].id)

            res.status(200).json({'result': true,'token': token})
        }
    }

    res.status(200).json({'result': false,'message': 'User not found.'})
}
