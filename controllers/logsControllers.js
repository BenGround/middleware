const logs = require('../models/MongoDB/logs');
const { createErrorResponse, createResponse } = require("../services/responseService");

exports.getConnectionLogs = async (req, res) => {
    logs.find()
        .then(Logs => createResponse(res, true, Logs))
        .catch(error => createErrorResponse(res, error));
}
