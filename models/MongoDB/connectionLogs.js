const mongoose = require('mongoose');

const connectionLogsSchema = mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, required: true }
});

module.exports = mongoose.model('connectionLogs', connectionLogsSchema);
