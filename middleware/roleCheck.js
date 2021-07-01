const _ = require('lodash')
const model = require('../models/index')
const message = require('../config/messages')
const {roles} = require("../config/roles");
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

const hasRoles = function (rolesId) {
    return (request, response, next) => {
        let idUser = request.app.get('userId');

        if (secureUser(response, idUser)) {
            Users.findOne({where: {id: idUser}})
                .then(User => {
                    if (User) {
                        if (rolesId.includes(parseInt(User.roleId)) || User.roleId === 7) {
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

const canDeleteOrEditUser = function (req, res, next) {
    let idUser = req.app.get('userId');

    if (secureUser(res, idUser)) {
        Users.findOne({where: {id: idUser}})
            .then(User => {
                if (User) {
                    if (User.roleId === roles.ROLE_COMMERCIAL || _.isEqual(parseInt(req.params.idUser), parseInt(req.app.get('userId')))) {
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

module.exports = { hasRoles, canDeleteOrEditUser };
