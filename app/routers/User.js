const Router = require('koa-router')
const router = new Router()
const { auth, userEmailExisted, userNotExist, useridNotExist } = require('../middleware/User')
const {
    register,
    login,
    getUser,
    followUser,
    unFollow,
    getFollowing,
    getFollowers,
} = require('../controllers/User')

router.post('/users', userEmailExisted, register)
router.post('/login', login)
router.get('/users/:userid', useridNotExist, getUser)
router.put('/following/:id', auth, userNotExist, followUser)
router.delete('/following/:id', auth, userNotExist, unFollow)
router.get('/following/:id', auth, userNotExist, getFollowing)
router.get('/followers/:id', auth, userNotExist, getFollowers)

module.exports = router