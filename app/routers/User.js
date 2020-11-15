const Router = require('koa-router')
const router = new Router()
const { auth } = require('../middleware/Auth')
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
router.get('/users/current', auth, getCurrent)
router.get('/users/:id', getUser)
router.post('/follows/:id', auth, followUser)
router.patch('/follows/:id', auth, unFollow)
router.get('/follows', auth, getFollows)
router.get('/fans', auth, getFans)

module.exports = router