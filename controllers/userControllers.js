const { userTokenValid } = require("../middleware/roleCheck");
const { createErrorResponse, createResponse } = require("../services/responseService");
const _ = require('lodash')
const crypto = require('crypto')
const logs = require('../models/MongoDB/logs');
const message = require('../config/messages')
const tokenService = require('../services/tokenService')
const model = require('../models/index')
const Users = model['Users'];
const Roles = model['Roles'];
const modelName = 'Utilisateur';

exports.getUsers = async (req, res) => {
    await Users.findAll({ include: { model: Roles } })
        .then(Users => createResponse(res, true, Users))
        .catch(error => createErrorResponse(res, error));
}

exports.getUserById = async (req, res) => {
    await Users.findOne({ include: { model: Roles }, where: { id: req.params.idUser }})
        .then(User => {
            if (User) {
                createResponse(res, true, User)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
    .catch(error => createErrorResponse(res, error));
}

exports.getUserByEmail = async (req, res) => {
    await Users.findOne({ where: { email: req.body.email } })
        .then(User => {
            if (User) {
                createResponse(res, true, Restaurant)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.createUser = async (req, res) => {
    await Users.create({
            email: req.body.email,
            password: crypto.createHash("sha256").update(req.body.password).digest("hex"),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            roleId: req.body.roleId,
            address: req.body.address,
            city: req.body.city
        }
    )
    .then(User => createResponse(res,
        true,
        {user: User, token: tokenService.createJWT(User.id)},
        message.createObject(modelName))
    )
    .catch(error => createErrorResponse(res, error));
}

exports.editUser = async (req, res) => {
    let userCount = await Users.findAndCountAll({ where: { id:req.params.idUser } });

    if (userCount.count > 0) {
        let dataToUpdate = {};
        if (req.body.email) {
            dataToUpdate.email = req.body.email;
        } else if (req.body.password) {
            dataToUpdate.password = crypto.createHash("sha256").update(req.body.password).digest("hex");
        } else if (req.body.roleId) {
            dataToUpdate.roleId = req.body.roleId;
        } else if (req.body.firstname) {
            dataToUpdate.firstname = req.body.firstname;
        } else if (req.body.lastname) {
            dataToUpdate.lastname = req.body.lastname;
        } else if (req.body.address) {
            dataToUpdate.address = req.body.address;
        } else if (req.body.city) {
            dataToUpdate.city = req.body.city;
        }

        dataToUpdate.updatedAt = Date.now();

        Users.update(dataToUpdate, {where: {id: req.params.idUser}})
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

exports.deleteUser = async (req, res) => {
    userTokenValid(req, res)

    await Users.destroy({ where: { id: req.params.idUser } })
        .then(function (isDeleted) {
            if (isDeleted) {
                createResponse(res, true)
            } else {
                createResponse(res, false, {}, message.notFoundObject(modelName))
            }
        })
        .catch(error => createErrorResponse(res, error));
}

exports.connectUser = async (req, res) => {
    const UserResult = await Users.findAndCountAll({ where: { email: req.body.email } })
        .catch(error => createErrorResponse(res, error));;

    if (UserResult.count > 0) {
        const userPassword = UserResult.rows[0].password;
        const password = crypto.createHash("sha256").update(req.body.password).digest("hex")

        if (_.isEqual(password, userPassword)) {
            let token = tokenService.createJWT(UserResult.rows[0].id)
            let fullname = UserResult.rows[0].firstname + ' ' + UserResult.rows[0].lastname;

            await logs.create({message: message.logConnectionUser(fullname), createdAt: Date.now()});
            createResponse(res, true, {token: token})
        }
    }

    createResponse(res, false, {}, message.notFoundObject(modelName))
}

exports.getRoleName = async (req, res) => {
    await Roles.findOne({ where: { id: req.params.idRole } })
        .then(Role => createResponse(res, true, Role.name))
        .catch(error => createErrorResponse(res, error));
}
