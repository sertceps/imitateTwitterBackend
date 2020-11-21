const Router = require('koa-router')
const router = new Router()
const {
    getAll,
} = require('../controllers/Feed')

router.get('/feeds', getAll)



module.exports = router