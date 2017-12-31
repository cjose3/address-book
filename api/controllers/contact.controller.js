const firebaseService = require('../services/firebase.service')

module.exports = { create }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function create(ctx) {
  try {
    await firebaseService.createContact(ctx.state.user, ctx.request.body)
    ctx.status = 201
  } catch (err) {
    if (!err.status) err.status = 400
    throw err
  }
}
