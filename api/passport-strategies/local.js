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
  console.log('User', User)
  const p = User.findOne({ email })
  console.log('p', p)

  done(null, { email: 'cj@cj.cj' })
  // .then(user => {
  //   if (!user || !user.validatePassword(password)) {
  //     done(null, false)
  //   }
  //   done(user)
  // })
  // .catch(err => done(err))
}
