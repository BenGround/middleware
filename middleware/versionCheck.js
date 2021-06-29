const loggerTest = require("../models/logger");
const message = require('../config/messages')
const { createResponse } = require("../services/responseService");

const versionChecking = function (req, res, next) {
    let version = req.headers.version;
    let origin = req.get('origin');
    console.log('VERSION : ', version)
    console.log('ORIGIN : ', origin)

    // if (version === '1.0') {
    //     if (origin === 'https://localhost:8080') {
            next()
        // } else {
        //     createResponse(res, false, {}, message.invalid_application_origin)
        // }
    // } else {
    //     createResponse(res, false, {}, message.invalid_application_version)
    // }
}

module.exports = versionChecking;
