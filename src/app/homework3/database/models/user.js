"use strict";
let Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      login: { type: Sequelize.STRING, allowNull: false },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          validatePassword: function(value) {
            if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/i.test(value)) {
              throw new Error("Password does not meets the requirements");
            }
          }
        }
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { min: 4, max: 130 }
      },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      isdeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { freezeTableName: true }
  );
  User.associate = function(models) {
    User.belongsToMany(models.Groups, {
      through: "GroupUsers",
      as: "groups",
      foreignKey: "userId"
    });
  };
  return User;
};
