const firebase = require('firebase-admin')

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const databaseURL = process.env.FIREBASE_DATABASE_URL
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')

module.exports = { initialize }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

function initialize() {
  const credential = firebase.credential.cert({
    projectId,
    clientEmail,
    privateKey
  })
  firebase.initializeApp({ databaseURL, credential })
  console.log('- The connection to firebase is established')
}
