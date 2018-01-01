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

function createContact(user, contact = {}) {
  if (!Object.keys(contact).length) {
    return Promise.reject(new Error('empty contact'))
  }
  const ref = firebase.database().ref(`users/${user.id}`)
  const contactRef = ref.child('contacts')
  const { key } = contactRef.push(contact)
  return { key }
}
