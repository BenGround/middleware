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

const hasRestaurateurRole = async function (req, res, next) {
    let idUser =  req.app.get('userId');

    if (await secureUser(res, idUser)) {
        await Users.findOne({where: {id: idUser}})
            .then(User => {
                if (User) {
                    if (_.isEqual(parseInt(User.roleId), parseInt(process.env.RESTAURATEUR))) {
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

module.exports = { hasRestaurateurRole };
