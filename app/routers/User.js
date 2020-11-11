const Router = require('koa-router')
const router = new Router()
const {
    register,
    login,
    getUser,
    followUser,
    getFollows,
    getFans
} = require('../controllers/User')

router.post('/users', register)
router.post('/login', login)
router.get('/users', getUser)

router.post('/follows', followUser)
router.get('/follows', getFollows)
router.get('/fans', getFans)

module.exports = router