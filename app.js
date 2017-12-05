const Koa = require('koa')
const config = require('./config')
const api = require('./api')

const app = Koa()
const port = process.env.PORT || 1337

config.bootstrap(app)
api.bootstrap(app)

app.listen(port)
