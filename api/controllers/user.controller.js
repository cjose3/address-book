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
    ctx.status = err.status || 400
    ctx.body = { message: err.message }
  }
}
