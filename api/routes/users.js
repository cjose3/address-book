const Router = require('koa-router')
const controller = require('../controllers/user.controller')

const router = new Router({ prefix: '/users' })
router.post('/', controller.create)

module.exports = router.routes()
