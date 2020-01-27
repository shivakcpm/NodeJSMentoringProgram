const uuid = require("uuid/v4");
let Sequelize = require("sequelize");
let dbConnector = require("../db/dbConnector");


var User = dbConnector.define(
  "users",
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
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    isDeleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  },
  { freezeTableName: true }
);

User.sync();

async function findOne(id) {
  let user = await User.findOne({
    where: { id }
  });
  return user;
}

async function create(user) {
  try{
  let data = await User.create(user);
  return data.dataValues;
  }catch(exe){
    console.log(exe);
  }
}

async function remove(id) {
  let user = await User.update(
    { isDeleted: true },
    {
      where: { id },
      returning: true,
      plain: true
    }
  );
  return user[1];
}

async function update(id, updatedUser) {
  try {
    let user = await User.update(updatedUser, {
      where: { id, isDeleted: false },
      returning: true,
      plain: true
    });
    return user ? user[1] : null;
  } catch (exe) {
    return null;
  }
}

async function findAll(login, limit) {
  let iLike = Sequelize.Op.iLike;
  let users = await User.findAll({
    limit: limit,
    where: { login: { [iLike]: login + "%" }, isDeleted: false }
  });
  return users;
}

module.exports = { create, update, findOne, findAll, remove };
