const pino = require("pino");

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

var log = {
  debug: function(msg) {
    logger.debug(msg);
  },

  info: function(msg) {
    logger.info(msg);
  }
};

module.exports = log;
