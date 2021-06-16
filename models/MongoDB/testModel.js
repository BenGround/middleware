const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    test: { type: String, required: true }
});

module.exports = mongoose.model('plats', testSchema);
