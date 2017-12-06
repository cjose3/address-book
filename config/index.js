const errorHandler = require('./error-handler')
const requestLogger = require('./request-logger')
const bodyParser = require('./body-parser')
const passport = require('./passport')
const db = require('./db')
const firebase = require('./firebase')

module.exports = { bootstrap }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function bootstrap(app) {
  await db.initialize(app)
  firebase.initialize()
  app.use(errorHandler)
  app.use(requestLogger)
  app.use(passport)
  app.use(bodyParser)
}
