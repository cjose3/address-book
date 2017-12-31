const winston = require('winston')

module.exports = { initialize }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function initialize(app) {
  const level = app.env === 'production' ? 'info' : 'debug'
  const transports = [
    new winston.transports.Console()
  ]
  app.context.logger = winston.createLogger({ level, transports })
}
