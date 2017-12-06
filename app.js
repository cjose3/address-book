const Koa = require('koa')
const cowsay = require('cowsay')
const config = require('./config')
const api = require('./api')
const { name: appName } = require('./package.json')

start()

async function start() {
  const port = process.env.PORT || 1337
  const app = new Koa()
  app.context.appName = appName

  await config.bootstrap(app)
  api.bootstrap(app)

  app.listen(port, () => {
    const text = `The app ${appName} is running on port: ${port}`
    console.log(cowsay.say({ text }))
  })
}
