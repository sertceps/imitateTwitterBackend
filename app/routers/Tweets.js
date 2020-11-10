const Router = require('koa-router')
const router = new Router()
const { tweet } = require('../Controllers/Tweet.js')

router.post('/tweet', tweet)

module.exports = router