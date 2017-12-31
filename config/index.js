const errorHandler = require('./error-handler')
const requestLogger = require('./request-logger')
const bodyParser = require('./body-parser')
const passport = require('./passport')
const db = require('./db')
const firebase = require('./firebase')
const logger = require('./logger')

module.exports = { bootstrap }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function bootstrap(app) {
  logger.initialize(app)
  app.use(requestLogger)
  await db.initialize(app)
  firebase.initialize()
  errorHandler.initialize(app)
  app.use(passport)
  app.use(bodyParser)
}
