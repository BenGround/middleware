const mongoose = require('mongoose');
const message = require("./messages");

const uri = 'mongodb+srv://admin:admin@cluster0.kprfz.mongodb.net/Project';
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Project'
    })
    .then(() => console.log(message.mongodb_connection_success))
    .catch(() => console.log(message.mongodb_connection_error));

module.exports = mongoose;
