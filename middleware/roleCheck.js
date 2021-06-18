const model = require('../models/index')
const Users = model['Users'];
const message = require('../messages')
const { createErrorResponse, createResponse } = require("../services/responseService");

const secureUser = async function (res, idUser) {
    if (idUser === undefined) {
        createResponse(res, false, {}, '[TokenCheck] ' + message.notFoundObject('Utilisateur'))
    }  else if (idUser === "tokenExpired") {
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
                    if (parseInt(User.roleId) === parseInt(process.env.RESTAURATEUR)) {
                        next();
                    } else {
                        return createResponse(res, false, {}, message.permission_denied);
                    }
                } else {
                    // return createResponse(res, false, {}, message.notFoundObject('Utilisateur'))
                }
            })
            .catch(error => createErrorResponse(res, error))
    }
}

module.exports = { hasRestaurateurRole };
