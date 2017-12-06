const passport = require('koa-passport')

require('../api/passport-strategies/jwt')
require('../api/passport-strategies/local')

module.exports = passport.initialize()
