const connectionLogs = require('../models/MongoDB/connectionLogs');
const downloadLogs = require('../models/MongoDB/downloadLogs');
const { createErrorResponse, createResponse } = require("../services/responseService");

exports.getConnectionLogs = async (req, res) => {
    connectionLogs.find()
        .then(Logs => createResponse(res, true, Logs))
        .catch(error => createErrorResponse(res, error));
}

exports.getDownloadLogs = async (req, res) => {
    downloadLogs.find()
        .then(Logs => createResponse(res, true, Logs))
        .catch(error => createErrorResponse(res, error));
}
