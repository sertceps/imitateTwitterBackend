const Router = require('koa-router')
const router = new Router()
const { auth, userEmailExisted, userNotExist, useridNotExist } = require('../middleware/User')
const {
    register,
    login,
    getUser,
    setFollowing,
    unFollowing,
    getFollowing,
    getFollowers,
    getBlocking,
    setBlocking,
    unBlocking,
} = require('../controllers/User')

router.post('/users', userEmailExisted, register)
router.post('/login', login)
router.get('/users/:userid', useridNotExist, getUser)
router.put('/following/:id', auth, userNotExist, setFollowing)
router.delete('/following/:id', auth, userNotExist, unFollowing)
router.get('/following/:id', auth, userNotExist, getFollowing)
router.get('/followers/:id', auth, userNotExist, getFollowers)
router.get('/blocking', auth, getBlocking)
router.put('/blocking/:id', auth, setBlocking)
router.delete('/blocking/:id', auth, unBlocking)

module.exports = router