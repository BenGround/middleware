const user = require('../models/user')
const crypto = require('crypto')

exports.getUsers = async (req, res) => {
    return await user.findAll()
        .then(Users => res.status(200).json(Users))
        .catch(error => res.status(400).json({error}));
}

exports.getUserById = async (req, res) => {
    return await user.findOne({ where: { id: req.params.idUser } })
        .then(User => res.status(200).json(User))
        .catch(error => res.status(400).json({error}));
}

exports.getUserByEmail = async (req, res) => {
    return await user.findOne({ where: { email: req.body.email } })
        .then(User => res.status(200).json(User))
        .catch(error => res.status(400).json({error}));
}

exports.createUser = async (req, res) => {
    return await user.create({
            email: req.body.email,
            password: crypto.createHash("sha256").update(req.body.password).digest("hex"),
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
    )
    .then(User => res.status(200).json(User))
    .catch(error => res.status(400).json({error}));
}


exports.deleteUser = async (req, res) => {
    return await user.destroy({ where: { id: req.params.idUser } })
        .then(function (isDeleted) {
            if (isDeleted) {
                res.status(200).json({'result': true})
            } else {
                res.status(200).json({'result': false, 'message': 'L\'utilisateur avec cet ID n\'existe pas'})
            }
        })
        .catch(error => res.status(400).json({'result': false, 'error': error}));
}
