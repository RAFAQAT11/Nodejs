const winston = require('winston');
const express = require("express");
const app = express();

require('./Startup/validation')();
require('./Startup/logging')();
require('./Startup/config')();
require('./Startup/db')();
require('./Startup/routes')(app);
require('./Startup/production')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
