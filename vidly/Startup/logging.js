const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
  // process.on('uncaughtException',(err)=>{
  //   console.log("Got an unexpected exception.");
  //   winston.error(err.message,err);
  // })

  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughExceptions.log" })
  );

  process.on("unhandledRejection", err => {
    throw err;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: "mongodb://localhost/vidly",
  //   level: "info"
  // });
  // throw new Error('error at starting');
};
