const winston = require('winston');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        handleExceptions: true,
        
        format: winston.format.combine(
            winston.format.label({ label: 'Winston Error Handler...' }),
            winston.format.timestamp(), winston.format.prettyPrint()
          )
      })
    ],
    exitOnError: false
  });

 


  module.exports = logger;