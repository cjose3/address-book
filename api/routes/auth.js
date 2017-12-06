const Router = require('koa-router')
const authPolicy = require('../policies/auth.policy')
const controller = require('../controllers/auth.controller')

const router = new Router({ prefix: '/auth' })
router.post('/', authPolicy, controller.authenticate)

module.exports = router.routes()
