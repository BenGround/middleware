const mongoose = require('mongoose');

const downloadLogsSchema = mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('downloadLogs', downloadLogsSchema);
