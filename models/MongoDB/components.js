const mongoose = require('mongoose');

const componentSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    isDeleted: { type: Boolean, required: false, default: false },
    updatedAt: { type: Date, required: false },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('components', componentSchema);
