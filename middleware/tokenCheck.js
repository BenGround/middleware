const loggerTest = require("../models/logger");
const message = require('../config/messages')
const { checkJWT } = require("../services/tokenService");
const { createResponse } = require("../services/responseService");

const tokenChecking = function (req, res, next) {
    let token = req.headers.authorization

    if (token) {
        token = token.replace(/^Bearer\s+/, "")

        const verify = checkJWT(token)

        if (!verify) {
            loggerTest.info('Bad token')
            return createResponse(res, false, {}, message.invalid_token);
        } else {
            req.app.set('userId', verify.user)
            next()
        }
    } else {
        return createResponse(res, false, {}, message.token_not_provided);
    }
}

module.exports = tokenChecking;
