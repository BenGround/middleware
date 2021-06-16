const test = require('../models/MongoDB/testModel');
const Role = require("../models/SQLServer/roles");

exports.test = async (req, res) => {
    test.find()
        .then(Sensor => res.status(200).json(Sensor))
        .catch(error => res.status(400).json({ error }));
}

exports.test2 = async (req, res) => {
    await user.findAll()
        .then(User => console.log(User))
}
