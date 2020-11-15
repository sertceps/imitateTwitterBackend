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
        const user = new User(userinfo)
        const fan = await new Fan({}).save()
        user.fans = fan._id
        await user.save()
        ctx.body = user
    }

    login = async (ctx) => {
        const user = await User.findOne({ userid: ctx.request.body.userid })
        if (!user) { ctx.throw(401, '用户名或密码错误') }
        const { _id, userid } = user
        const token = jwt.sign({ _id, userid }, 'secretKey')
        ctx.body = { token }
    }
    getCurrent = async (ctx) => {
        const user = await User.findById(ctx.state.user._id)
        ctx.body = user
    }

    getUser = async (ctx) => {
        const user = await User.findOne({ _id: ctx.params.id })
        if (!user) { ctx.throw(404, '用户不存在') }
        ctx.body = user
    }

    followUser = async (ctx) => {
        const user = await User.findById(ctx.state.user._id)
        const follow = await User.findById(ctx.params.id)
        if (!follow) { ctx.throw(404, '用户不存在') }
        if (user.follows.map(id => id.toString()).includes(ctx.params.id)) {
            ctx.throw(409, '已关注该用户')
        }
        user.follows.push(ctx.params.id)
        await user.save()
        const fan = await Fan.findById(follow.fans)
        fan.fans.push(_id)
        await fan.save()
        ctx.body = user
    }
    unFollow = async (ctx) => {
        const user = await User.findById(ctx.state.user._id)
        user.follows = user.follows.filter(id => id.toString() !== ctx.params.id)
        await user.save()
        ctx.body = user
    }
    getFollows = async (ctx) => {
        const follows = await User.findById(ctx.user.state._id).populate('follows').exec()
        ctx.body = follows
    }
    getFans = async (ctx) => {
        const fans = await User.findById(ctx.user.state._id).populate('fans').exec()
        ctx.body = fans
    }
}

module.exports = new UserCtl()