let Sequelize = require("sequelize");
let config = require("../config/dbconfig");

let sequelize = new Sequelize(
  config.database,
  config.userName,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    protocol: config.protocol,
    dialectOptions:config.dialectOptions
  }
);

sequelize.authenticate().then(
  suceess => {
    console.log("suceess", suceess);
  },
  error => {
    console.log("error", error);
  }
);

module.exports = sequelize;
