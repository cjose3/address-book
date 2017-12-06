const jwt = require('jsonwebtoken')

module.exports = { authenticate }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function authenticate(ctx) {
  try {
    const secret = process.env.JWT_SECRET || 'jwt-secret'
    const data = { sub: ctx.user._id }
    const opts = { expiresIn: '1h' }
    const accessToken = jwt.sign(data, secret, opts)
    ctx.body = { accessToken }
    ctx.status = 200
  } catch (err) {
    err.status = err.status || 400
    throw err
  }
}
