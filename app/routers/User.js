const Router = require('koa-router')
const router = new Router()
const { register, login } = require('../Controllers/User')

router.post('/register', register)
router.post('/login', login)

module.exports = router