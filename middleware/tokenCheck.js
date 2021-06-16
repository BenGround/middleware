const loggerTest = require("../models/logger");
const {checkJWT} = require("../services/tokenService");

const tokenChecking = function (req, res, next) {
    let token = req.headers.authorization

    if (token) {
        token = token.replace(/^Bearer\s+/, "")

        const verify = checkJWT(token)

        if (!verify) {
            loggerTest.info('Bad token')
            return res.status(500).json({
                success: false,
                message: 'Token is not valid'
            })
        } else {
            // app.set('userId', verify.user.id)
            next()
        }
    } else {
        return res.status(500).json({
            success: false,
            message: 'Token not provided'
        })
    }
}

module.exports = tokenChecking;
