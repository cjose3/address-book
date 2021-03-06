const Koa = require('koa')
const cowsay = require('cowsay')
const config = require('./config')
const api = require('./api')
const { name: appName } = require('./package.json')

module.exports = start()

async function start() {
  const port = process.env.PORT
  const app = new Koa()
  app.context.appName = appName

  await config.bootstrap(app)
  api.bootstrap(app)

  return app.listen(port, () => {
    const text = `The app ${appName} is running on port: ${port}`
    console.log(cowsay.say({ text }))
  })
}
