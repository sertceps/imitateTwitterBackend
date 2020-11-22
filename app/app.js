const Kao = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Kao()
const initRouter = require('./routers/initRouter')
require('./models/connection')

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (e) {
        ctx.status = e.status || e.statusCode || 500
        ctx.body = {
            "code": ctx.status,
            "message": e.message
        }
    }
})

app
    .use(bodyParser())

initRouter(app)
app.listen(3000)