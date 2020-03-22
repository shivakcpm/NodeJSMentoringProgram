'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dotenv = require('dotenv');
dotenv.config();
const db = {};

let sequelize;
let dbConfig = {
  username:process.env.dbUser,
  password:process.env.password,
  database:process.env.database,
  dialect:process.env.dialect,
  host:process.env.host,
  protocol:process.env.protocol,
  dialectOptions:{ssl:process.env.ssl === 'true'}
}
console.log(dbConfig);
sequelize = new Sequelize(process.env.database, process.env.dbUser, process.env.password, dbConfig);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
