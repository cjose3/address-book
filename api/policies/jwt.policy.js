const passport = require('koa-passport')

module.exports = policy

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function policy(ctx, next) {
  await passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      const message = (err && err.message) || 'Invalid access token'
      ctx.status = 401
      ctx.body = { message }
    } else {
      ctx.user = user
      next()
    }
  })(ctx, next)
}
