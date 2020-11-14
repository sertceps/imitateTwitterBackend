const User = require('../models/User')
const Fan = require('../models/Fan')
const jwt = require('jsonwebtoken')

class UserCtl {
    register = async (ctx) => {
        const userinfo = ctx.request.body
        const { userid, email } = userinfo
        const isUser = await User.findOne({ userid })
        const isEmail = await User.findOne({ email })
        if (isUser) { ctx.throw(409, "用户已存在") }
        if (isEmail) { ctx.throw(409, '邮箱已存在') }
        const user = await new User(userinfo)
        const fan = await new Fan({}).save()
        user.fans = fan._id
        user.save()
        ctx.body = user
    }

    login = async (ctx) => {
        const user = await User.findOne(ctx.request.body)
        if (!user) { ctx.throw(401, '用户名或密码错误') }
        const { _id, userid } = user
        const token = jwt.sign({ _id, userid }, 'secretKey')
        ctx.body = { token }
    }
    getCurrent = async (ctx) => {
        if (ctx.header.authorization == undefined) { ctx.throw(404, 'not found') }
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const user = await User.findById({ _id })
        if (!user) {
            ctx.throw(401, '登录错误')
        }
        ctx.body = user
    }

    getUser = async (ctx) => {
        const user = await User.findOne({ _id: ctx.params.id })
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user
    }

    followUser = async (ctx) => {
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const user = await User.findById({ _id })
        const follow = await User.findById(ctx.params.id)
        if (!follow) {
            ctx.throw(404, '用户不存在')
        }
        if (!user) {
            ctx.throw(401, '登录错误')
        }
        if (user.follows.map(id => id.toString()).includes(ctx.params.id)) {
            ctx.throw(409, '已关注该用户')
        }
        user.follows.push(ctx.params.id)
        user.save()
        const fan = await Fan.findById(follow.fans)
        fan.fans.push(_id)
        fan.save()
        ctx.body = user
    }
    unFollow = async (ctx) => {
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const user = await User.findById({ _id })
        user.follows = user.follows.filter(id => id.toString() !== ctx.params.id)
        user.save()
        ctx.body = user
    }
    getFollows = async (ctx) => {
        if (ctx.header.authorization == undefined) { ctx.throw(401, '登录错误') }
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const follows = await User.findById({ _id }).populate('follows').exec()
        ctx.body = follows
    }
    getFans = async (ctx) => {
        if (ctx.header.authorization == undefined) { ctx.throw(401, '登陆错误') }
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const fans = await User.findById({ _id }).populate('fans').exec()
        ctx.body = fans
    }
}

module.exports = new UserCtl()