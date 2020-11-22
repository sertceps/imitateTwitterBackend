const Router = require('koa-router')
const router = new Router()
const {
    getAllTweets,
} = require('../controllers/Feed')

router.get('/feeds', getAllTweets)



module.exports = router