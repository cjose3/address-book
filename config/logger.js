const winston = require('winston')

module.exports = { initialize }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function initialize(app) {
  const level = app.env === 'production' ? 'info' : 'debug'
  const transports = [new winston.transports.Console()]
  const format = winston.format.prettyPrint()
  const opts = { level, transports, format }
  app.context.logger = winston.createLogger(opts)
}
