const Router = require('koa-router')
const jwtPolicy = require('../policies/jwt.policy')
const controller = require('../controllers/contact.controller')

const router = new Router({ prefix: '/contacts' })
router.post('/', jwtPolicy, controller.create)

module.exports = router.routes()
