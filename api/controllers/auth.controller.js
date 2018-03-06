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
      accessToken: generateAccessToken(ctx.state.user),
      firebaseToken: await firebaseService.generateToken(ctx.state.user)
    }
    ctx.status = 200
  } catch (err) {
    if (!err.status) err.status = 400
    throw err
  }
}

function generateAccessToken(user) {
  const secret = process.env.JWT_SECRET
  const data = { sub: user._id }
  const opts = { expiresIn: '1h' }
  return jwt.sign(data, secret, opts)
}
