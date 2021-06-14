const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cesitonplat", "admin", "admin", {
    host: "localhost",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
