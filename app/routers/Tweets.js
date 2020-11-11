const Router = require('koa-router')
const router = new Router()
const {
    setTweet,
    getTweet,
    setComment,
    getComment,
    updateLikes
} = require('../controllers/Tweet.js')

// 兼职转发
router.post('/tweets', setTweet)
router.get('/tweets', getTweet)

router.post('/comments', setComment)
router.get('/comments', getComment)
router.post('/likes', updateLikes)


module.exports = router