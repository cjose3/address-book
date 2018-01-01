const passport = require('koa-passport')

module.exports = policy

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function policy(ctx, next) {
  const callback = async(err, user) => {
    if (err || !user) {
      const message = (err && err.message) || 'Missing credentials'
      ctx.status = 401
      ctx.body = { message }
    } else {
      ctx.state.user = user
      await next()
    }
  }
  await passport.authenticate('local', callback)(ctx, next)
}
