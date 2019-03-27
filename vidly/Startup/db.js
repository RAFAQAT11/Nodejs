const winston = require('winston');
const Mongoose = require("mongoose");
const config = require('config');

module.exports = function(){
    Mongoose.set('useNewUrlParser', true);
    Mongoose.set('useFindAndModify', true);
    Mongoose.set('useCreateIndex', true);
    const db = config.get('db');
    Mongoose.connect(db, { useNewUrlParser: true })
        .then(() => winston.info(`Connected to ${db} ...`))
}