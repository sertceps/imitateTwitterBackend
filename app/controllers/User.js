const User = require('../models/User/User')
const Follower = require('../models/User/Follower')
const Following = require('../models/User/Following')
const Blocking = require('../models/User/Blocking')
const Tweet_r = require('../models/Tweet/Tweet-r')
const Liked = require('../models/Tweet/Liked')
const jwt = require('jsonwebtoken')

class UserCtl {
    register = async (ctx) => {
        const userinfo = ctx.request.body
        const { userid, email, password } = userinfo
        const isUser = await User.findOne({ userid })
        const isEmail = await User.findOne({ email })
        if (isUser) { ctx.throw(409, "用户名已存在") }
        if (isEmail) { ctx.throw(409, '邮箱已存在') }

        const onwer = { onwer_id: userid }
        const ids = {
            tweets_r: await new Tweet_r(onwer).save(),
            liked: await new Liked(onwer).save(),
            followers: await new Follower(onwer).save(),
            following: await new Following(onwer).save(),
            blocking: await new Blocking(onwer).save(),
        }
        const apiDomain = 'http://localhost:3000'
        const domain = 'https://example.com'
        const new_user = {
            userid,
            email,
            password,
            tweets_url: `${apiDomain}/tweets_r/${ids.tweets_r._id}`,
            liked_url: `${apiDomain}/likee/${ids.liked._id}`,
            followers_url: `${apiDomain}/followers/${ids.followers._id}`,
            following_url: `${apiDomain}/following/${ids.following._id}`,
            blocking__url: `${apiDomain}/blocking/${ids.blocking._id}`,
            url: `${apiDomain}/users/${userid}`,
            html_url: `${domain}/${userid}`
        }
        const user = await new User(new_user).save()
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