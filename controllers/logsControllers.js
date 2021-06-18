const logs = require('../models/MongoDB/logs');

exports.getConnectionLogs = async (req, res) => {
    logs.find()
        .then(Log => res.status(200).json(Log))
        .catch(error => res.status(400).json({ error }));
}
