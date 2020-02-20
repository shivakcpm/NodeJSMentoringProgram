let logger = require('./winstonLogger');
let errorHandler = function(err,req,res,next){
   //  console.log("Error......................");
    if (res.headersSent) {
        return next(err)
      }
     
      logger.error(err.name,{'path':req.path,'body':req.body,'params':req.params,'query':req.query});
    res.status(500).send('Internal Server Error')
}
module.exports = errorHandler;