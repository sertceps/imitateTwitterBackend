const Kao = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Kao()
const initRouter = require('./routers/initRouter')
require('./models/connection')

app
    .use(bodyParser())

initRouter(app)
app.listen(3000)