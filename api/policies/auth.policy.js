const passport = require('koa-passport')

module.exports = policy

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function policy(ctx, next) {
  await passport.authenticate('local', (err, user) => {
    if (err || !user) {
      ctx.status = 401
    } else {
      ctx.user = user
      next()
    }
  })(ctx, next)
}
