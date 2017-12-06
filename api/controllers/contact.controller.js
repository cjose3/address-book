const firebaseService = require('../services/firebase.service')

module.exports = { create }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function create(ctx) {
  try {
    firebaseService.createContact(ctx.user, ctx.request.body)
    ctx.status = 201
  } catch (err) {
    err.status = err.status || 400
    throw err
  }
}
