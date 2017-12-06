const mongoose = require('mongoose')

module.exports = { initialize }

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function initialize(app) {
  const uri =
    process.env.MONGODB_URI || `mongodb://localhost/${app.context.appName}`
  const options = {
    useMongoClient: true
  }
  mongoose.Promise = global.Promise
  await mongoose.connect(uri, options)
  console.log('- The connection to the database is established')
}
