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
      if (!user) throw new Error('The email not exists')
      const promises = [user, user.validatePassword(password)]
      return Promise.all(promises)
    })
    .then(([user]) => done(null, user))
    .catch(done)
}
