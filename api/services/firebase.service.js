const firebase = require('firebase-admin')

module.exports = { generateToken, createContact }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function generateToken(user) {
  return firebase.auth().createCustomToken(user.id)
}

function createContact(user, contact) {
  const ref = firebase.database().ref(`users/${user.id}`)
  const contactRef = ref.child('contacts')
  contactRef.push().set(contact)
}
