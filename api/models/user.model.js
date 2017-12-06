const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: String,
  password: String
})
schema.methods.validatePassword = validatePassword

module.exports = mongoose.model('User', schema)

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function validatePassword(password) {
  return this.password === password
}
