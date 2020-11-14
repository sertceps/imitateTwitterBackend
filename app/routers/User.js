const Router = require('koa-router')
const router = new Router()
const {
    register,
    login,
    getCurrent,
    getUser,
    followUser,
    unFollow,
    getFollows,
    getFans,
} = require('../controllers/User')

router.post('/users', register)
router.post('/login', login)
router.get('/users/current', getCurrent)
router.get('/users/:id', getUser)
router.post('/follows/:id', followUser)
router.patch('/follows/:id', unFollow)
router.get('/follows', getFollows)
router.get('/fans', getFans)

module.exports = router