const mongoose = require('mongoose');

const uri = 'mongodb+srv://admin:admin@cluster0.kprfz.mongodb.net/Project';
mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Project'
    })
    .then(() => console.log('Connexion à MongoDB  Commune réussie !'))
    .catch(() => console.log('Connexion à MongoDB Commune échouée !'));

module.exports = mongoose;
