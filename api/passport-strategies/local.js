const passport = require('koa-passport')
const { Strategy } = require('passport-local')
const User = require('../models/user.model')

const opts = {
  usernameField: 'email',
  passwordField: 'password'
}
const localStrategy = new Strategy(opts, callback)

passport.use(localStrategy)

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function callback(email, password, done) {
  User.findOne({ email })
    .then(user => {
      if (!user || !user.validatePassword(password)) {
        done(null, false)
      } else {
        done(null, user)
      }
    })
    .catch(err => done(err))
}
