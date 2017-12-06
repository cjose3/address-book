const passport = require('koa-passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const opts = {
  secretOrKey: process.env.JWT_SECRET || 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const jwtStrategy = new Strategy(opts, callback)
passport.use(jwtStrategy)

function callback(payload, done) {
  done()
}
