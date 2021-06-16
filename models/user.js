const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sqlServerInstance')

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'users'
});

console.log(User === sequelize.models.User);

module.exports = User;
