const Router = require('koa-router')
const router = new Router()
const { auth } = require('../middleware/User')
const {
    setTweet,
    getTweet,
    getUserTweets,
    delTweet,
    setComment,
    getComment,
    delComment,
    setLiked,
    unLiked,
    getLiked,
    getLikers,
    setRetweet,
    getRetweeters,
    delRetweeter,
    searchTweet,
} = require('../controllers/Tweet.js')

router.post('/tweets', auth, setTweet)
router.get('/tweets/users/:id', auth, getUserTweets)
router.get('/tweets/:id', getTweet)
router.del('/tweets/:id', auth, delTweet)
router.post('/retweets/:id', auth, setRetweet)
router.delete('/retweets/:id', auth, delRetweeter)
router.get('/retweets/:id', getRetweeters)
router.post('/comments/:id', auth, setComment)
router.get('/comments/:id', getComment)
router.del('/comments/:id', auth, delComment)
router.put('/liked/:id', auth, setLiked)
router.delete('/liked/:id', auth, unLiked)
router.get('/likers/:id', getLikers)
router.get('/liked', auth, getLiked)
router.get('/search/tweets', auth, searchTweet)

module.exports = router