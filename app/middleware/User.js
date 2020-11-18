const jwt = require('koa-jwt')
const User = require('../models/User/User')


module.exports = {
    auth: jwt({ secret: 'secretKey' }),
    userEmailExisted: async (ctx, next) => {
        const user = await User.findOne({ userid: ctx.request.body.userid })
        const email = await User.findOne({ email: ctx.request.body.email })
        if (user) {
            ctx.throw(409, '用户已存在')
        }
        if (email) {
            ctx.throw(409, '邮箱已存在')
        }
        await next()
    },
    userNotExist: async (ctx, next) => {
        const user = await User.findById(ctx.params.id)
        if (!user) {
            ctx.throw(404, '用户不存在')
        }
        await next()
    },
    useridNotExist: async (ctx, next) => {
        const user = await User.findOne({ userid: ctx.params.userid })
        if (!user) {
            ctx.throw(404, '用户不存在')
        }
        await next()
    }
}

