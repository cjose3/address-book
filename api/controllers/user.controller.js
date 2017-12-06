const User = require('../models/user.model')

module.exports = { create }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function create(ctx) {
  const { body } = ctx.request
  try {
    ctx.body = await User.create(body)
    ctx.status = 201
  } catch (err) {
    err.status = err.status || 400
    throw err
  }
}
