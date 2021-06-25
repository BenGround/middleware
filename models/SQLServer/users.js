'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Roles, {
        foreignKey: 'roleId'
      })
      this.hasOne(models.Restaurants, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'restaurateurId',
        onDelete: 'cascade'
      })
      this.hasMany(models.Orders, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'userId',
        onDelete: 'cascade'
      }),
      this.hasMany(models.Notifications, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'userId',
        onDelete: 'cascade'
      }),
      this.hasMany(models.Orders, {
        allowNull: false,
        type: DataTypes.UUID,
        foreignKey: 'deliveryUserId',
        onDelete: 'cascade'
      })
    }
  };
  Users.init({
    email: {
      unique: true,
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
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    referralCode: {
      type: DataTypes.UUID,
    },
    referralUserId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    isSuspended: {
      defaultValue: 0,
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    isDeleted: {
      defaultValue: 0,
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.referralCode = uuidv4();
      }
    },
    sequelize,
    modelName: 'Users',
  });

  return Users;
};
