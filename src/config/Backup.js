const winston = require("winston");

const backup = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [new winston.transports.File({ filename: "backup.log" })],
});

module.exports = backup;
