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
    const user = new User(body)
    ctx.body = await user.save()
    ctx.status = 201
  } catch (err) {
    ctx.status = 400
  }
}
