const auth = require('./routes/auth')
const users = require('./routes/users')
const contacts = require('./routes/contacts')

module.exports = { bootstrap }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function bootstrap(app) {
  app.use(auth)
  app.use(users)
  app.use(contacts)
}
