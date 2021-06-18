const _ = require('lodash')
const model = require('../models/index')
const message = require('../config/messages')
const Users = model['Users'];
const { createErrorResponse, createResponse } = require("../services/responseService");

const secureUser = async function (res, idUser) {
    if (_.isUndefined(idUser)) {
        createResponse(res, false, {}, '[TokenCheck] ' + message.notFoundObject('Utilisateur'))
    }  else if (_.isEqual(idUser, "tokenExpired")) {
        createResponse(res, false, {}, message.invalid_token);
    } else {
        return true;
    }
}

const hasRole = async function (req, res, next, roleId) {
    let idUser =  req.app.get('userId');

    if (await secureUser(res, idUser)) {
        await Users.findOne({where: {id: idUser}})
            .then(User => {
                if (User) {
                    if (_.isEqual(parseInt(User.roleId), parseInt(roleId))) {
                        next();
                    } else {
                        return createResponse(res, false, {}, message.permission_denied);
                    }
                } else {
                    return createResponse(res, false, {}, message.notFoundObject('Utilisateur'))
                }
            })
            .catch(error => createErrorResponse(res, error))
    }
}

const hasRestaurateurRole = function (req, res, next) {
    return hasRole(req, res, next, process.env.ROLE_RESTAURATEUR)
}

const userTokenValid = function (req, res) {
    if (_.isEqual(parseInt(req.params.idUser), parseInt(req.app.get('userId')))) {
        return true;
    } else {
        return createResponse(res, false, {}, message.permission_denied);
    }
}

module.exports = { hasRestaurateurRole, userTokenValid };
