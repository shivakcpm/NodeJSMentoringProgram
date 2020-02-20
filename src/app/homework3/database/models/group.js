"use strict";
let Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Groups",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      permissions: DataTypes.ARRAY(DataTypes.STRING)
    },
    { freezeTableName: true }
  );
  Group.associate = function(models) {
    // associations can be defined here
    Group.belongsToMany(models.Users, {
      through: "GroupUsers",
      as: "users",
      foreignKey: "groupId"
    });
  };
  return Group;
};
