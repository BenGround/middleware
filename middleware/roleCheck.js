const _ = require('lodash')
const model = require('../models/index')
const message = require('../config/messages')
const Users = model['Users'];
const { createErrorResponse, createResponse } = require("../services/responseService");

const secureUser = function (res, idUser) {
    if (_.isUndefined(idUser)) {
        createResponse(res, false, {}, '[TokenCheck] ' + message.notFoundObject('Utilisateur'))
    }  else if (_.isEqual(idUser, "tokenExpired")) {
        createResponse(res, false, {}, message.invalid_token);
    } else {
        return true;
    }
}

const hasRole = function (roleId) {
    return (request, response, next) => {
        let idUser = request.app.get('userId');

        if (secureUser(response, idUser)) {
            Users.findOne({where: {id: idUser}})
                .then(User => {
                    if (User) {
                        if (_.isEqual(parseInt(User.roleId), parseInt(roleId))) {
                            next();
                        } else {
                            return createResponse(response, false, {}, message.permission_denied);
                        }
                    } else {
                        return createResponse(response, false, {}, message.notFoundObject('Utilisateur'))
                    }
                })
                .catch(error => createErrorResponse(response, error))
        }
    }
}

const userTokenValid = function (req, res) {
    if (_.isEqual(parseInt(req.params.idUser), parseInt(req.app.get('userId')))) {
        return true;
    } else {
        return createResponse(res, false, {}, message.permission_denied);
    }
}

module.exports = { userTokenValid, hasRole };
