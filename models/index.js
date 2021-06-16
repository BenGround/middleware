const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
//const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
      config.database, config.username, config.password, config
  );
}

const models = [
  require('./SQLServer/users')(sequelize, Sequelize),
  require('./SQLServer/roles')(sequelize, Sequelize),
];

models.forEach(model => {
  db[model.name] = model;
});

models.forEach(model => {
  if (db[model.name].associate) {
    console.log("entered");
    db[model.name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
