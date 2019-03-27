const config = require('config');

module.exports = function() {
  if (!config.get("topPrivateKey")) {
    throw new Error("FATAL ERROR: topPrivateKey is not defined.");
  }
};
