const loggerTest = require("../models/logger");
const message = require('../config/messages')
const { createResponse } = require("../services/responseService");

const versionChecking = function (req, res, next) {
    let version = req.headers.version
    console.log('VERSION : ', version)

    // if (version === '1.0') {
        next()
    // } else {
    //     createResponse(res, false, {}, message.invalid_application_version)
    // }
}

module.exports = versionChecking;
