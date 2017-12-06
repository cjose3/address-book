const jwt = require('jsonwebtoken')
const firebaseService = require('../services/firebase.service')

module.exports = { authenticate }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function authenticate(ctx) {
  try {
    ctx.body = {
      accessToken: generateAccessToken(ctx.user),
      firebaseToken: await firebaseService.generateToken(ctx.user)
    }
    ctx.status = 200
  } catch (err) {
    err.status = err.status || 400
    throw err
  }
}

function generateAccessToken(user) {
  const secret = process.env.JWT_SECRET || 'jwt-secret'
  const data = { sub: user._id }
  const opts = { expiresIn: '1h' }
  return jwt.sign(data, secret, opts)
}
