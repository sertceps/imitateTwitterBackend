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
router.get('/tweets/:id', getTweet)
router.post('/comments/:id', setComment)
router.get('/comments/:id', getComment)
router.patch('/likes/:id', updateLikes)


module.exports = router