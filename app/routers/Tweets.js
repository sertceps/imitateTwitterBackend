const Router = require('koa-router')
const router = new Router()
const { auth } = require('../middleware/User')
const { idValidator, pageValidator, contentValidator, } = require('../middleware/Validators')
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

router.post('/tweets', auth, contentValidator, setTweet)
router.get('/tweets/users/:id', auth, idValidator, getUserTweets)
router.get('/tweets/:id', idValidator, getTweet)
router.del('/tweets/:id', auth, idValidator, delTweet)
router.post('/retweets/:id', auth, idValidator, setRetweet)
router.delete('/retweets/:id', auth, idValidator, delRetweeter)
router.get('/retweets/:id', idValidator, getRetweeters)
router.post('/comments/:id', auth, idValidator, setComment)
router.get('/comments/:id', idValidator, getComment)
router.del('/comments/:id', auth, idValidator, delComment)
router.put('/liked/:id', auth, idValidator, setLiked)
router.delete('/liked/:id', auth, idValidator, unLiked)
router.get('/likers/:id', idValidator, getLikers)
router.get('/liked', auth, getLiked)
router.get('/search/tweets', auth, pageValidator, searchTweet)

module.exports = router