const passport = require('koa-passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/user.model')

const opts = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const jwtStrategy = new Strategy(opts, callback)
passport.use(jwtStrategy)

function callback(payload, done) {
  User.findById(payload.sub)
    .then(user => {
      if (!user) throw new Error(`The user ${payload.sub} not exists`)
      done(null, user)
    })
    .catch(done)
}
