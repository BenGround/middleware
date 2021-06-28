const components = require('../models/MongoDB/components');
const message = require("../config/messages");
const { createErrorResponse, createResponse } = require("../services/responseService");
const modelName = "Composant";

exports.getAllComponents = async (req, res) => {
    components.find()
        .then(Components => createResponse(res, true, Components))
        .catch(error => createErrorResponse(res, error));
}

exports.createComponent = async (req, res) => {
    let data = {
        name: req.body.name,
        description: req.body.description,
    };

    const component = components.create(data, function (err, small) {
        if (err) createErrorResponse(res, error);
        createResponse(res, true, component, message.createObject(modelName))
    });
}

exports.editComponent = async (req, res) => {
    components.findOne({ _id: req.params.idComponent })
        .exec(function(err, doc){
            doc.name = req.body.name;
            doc.description = req.body.description;
            doc.updatedAt = Date.now();
            doc.save();

            components.findOne({ _id: req.params.idComponent })
                .then(Component => createResponse(res, true, Component, message.editObject(modelName)))
                .catch(error => createErrorResponse(res, error));
        });
}

exports.deleteComponent = async (req, res) => {
    components.deleteOne({ _id: req.params.idComponent }, function (err) {
        if (err) createErrorResponse(res, error);
        createResponse(res, true,  [], message.deleteObject(modelName))
    });
}
