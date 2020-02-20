const express = require("express");
const bodyParser = require("body-parser");

const suggestRoutes = require("./api/suggestionRoutes");
const userRoutes = require("./api/userRoutes");
const groupRoutes = require("./api/groupRoutes");
const userGroupRoutes = require("./api/userGroupRoutes");
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const winstonLogger = require('./middleware/winstonLogger');

const sequelize = require('./database/models').sequelize;

const app = express();

const PORT = process.env.PORT || "3001";

app.use(bodyParser.json());
app.use(logger);


app.use('/users', suggestRoutes);
app.use('/user', userRoutes);
app.use('/group', groupRoutes);
app.use("/usergroup",userGroupRoutes)
app.use(errorHandler);
app.all("*", (req, res) => {
  return res.status(404).end();
});

process.on('unhandledRejection',(e,origin)=>{
  // console.log('error');
  winstonLogger.error('Winston unhandled rejection Logger...',e,origin);
 // winstonLogger.error('Winston Uncaught Exception Logger',"\nerror:",e,"\norigin:",origin)
})

process.on('uncaughtException',(e,origin)=>{
 // console.log('error');
  winstonLogger.error('Winston Uncaught Exception Logger...',e,origin);
 // winstonLogger.error('Winston Uncaught Exception Logger',"\nerror:",e,"\norigin:",origin)
})

sequelize.sync().then(function() {
  app.listen(PORT,() => {
    console.log("Server listening on port number ", PORT);
  });
});
