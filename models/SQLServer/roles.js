'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `model/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Users, {
        defaultValue: 0,
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'roleId'
      })
    }
  };
  Roles.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Roles',
  });
  return Roles;
};
