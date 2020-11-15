const Router = require('koa-router')
const router = new Router()
const { auth } = require('../middleware/Auth')
const {
    setTweet,
    getTweet,
    setComment,
    getComment,
    updateLikes
} = require('../controllers/Tweet.js')

// 兼职转发
router.post('/tweets', auth, setTweet)
router.get('/tweets/:id', auth, getTweet)
router.post('/comments/:id', auth, setComment)
router.get('/comments/:id', getComment)
router.patch('/likes/:id', auth, updateLikes)


module.exports = router