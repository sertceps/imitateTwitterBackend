const Router = require('koa-router')
const router = new Router()
const { auth, userEmailExisted, userNotExist, useridNotExist } = require('../middleware/Verify')
const { registerValidator, loginValidator, idValidator, pageValidator, } = require('../middleware/Validators')
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
    searchUser,
} = require('../controllers/User')

router.post('/users', userEmailExisted, registerValidator, register)
router.post('/login', loginValidator, useridNotExist, login)
router.get('/users/:userid', useridNotExist, getUser)
router.put('/following/:id', auth, idValidator, userNotExist, setFollowing)
router.delete('/following/:id', auth, idValidator, userNotExist, unFollowing)
router.get('/following/:id', auth, idValidator, userNotExist, getFollowing)
router.get('/followers/:id', auth, idValidator, userNotExist, getFollowers)
router.get('/blocking', auth, idValidator, getBlocking)
router.put('/blocking/:id', auth, idValidator, setBlocking)
router.delete('/blocking/:id', auth, idValidator, unBlocking)
router.get('/search/users', pageValidator, searchUser)

module.exports = router