
const User = require('../models/User')

class UserCtl {
    // CRUD
    register = async (ctx) => {
        const userinfo = ctx.request.body
        const user = await new User(userinfo).save()
        ctx.body = user
    }
    login = async (ctx) => {
        ctx.body = { "message": "login success" }
    }
}

module.exports = new UserCtl()