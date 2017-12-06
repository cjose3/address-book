const passport = require('koa-passport')

module.exports = policy

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function policy(ctx, next) {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      ctx.status = 401
    }
    ctx.user = user
    next()
  })(ctx, next)
}
