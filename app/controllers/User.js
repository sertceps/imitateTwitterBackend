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
        const onwer = { onwer_id: userid }
        const ids = {
            // 验证唯一性
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
            following: ids.following._id,
            followers: ids.followers._id,
            blocking: ids.blocking._id,
            tweets_url: `${apiDomain}/tweets_r/${ids.tweets_r._id}`,
            liked_url: `${apiDomain}/likee/${ids.liked._id}`,
            url: `${apiDomain}/users/${userid}`,
            html_url: `${domain}/${userid}`
        }
        const user = await new User(new_user).save()
        ctx.body = user
    }

    login = async (ctx) => {
        const user = await User.findOne(ctx.request.body)
        if (!user) { ctx.throw(401, '用户名或密码错误') }
        const { _id, userid } = user
        const token = jwt.sign({ _id, userid }, 'secretKey')
        ctx.body = { token }
    }
    getUser = async (ctx) => {
        const user = await User.findOne({ userid: ctx.params.userid })
        ctx.body = user
    }

    followUser = async (ctx) => {
        const me = await User.findById(ctx.state.user._id).select('following').populate('following')
        const one = await User.findById(ctx.params.id).select('followers').populate('followers')
        if (!me.following.list.map(id => id.toString()).includes(ctx.params.id)) {
            me.following.list.push(ctx.params.id)
            one.followers.list.push(ctx.state.user._id)
            await one.followers.save()
            await me.following.save()
        } else {
            ctx.throw(409, '已关注该用户')
        }
        ctx.status = 204
    }
    unFollow = async (ctx) => {
        const { following } = await User.findById(ctx.state.user._id).select('following').populate('following')
        const { followers } = await User.findById(ctx.params.id).select('followers').populate('followers')
        following.list = following.list.filter(id => id.toString() !== ctx.params.id)
        followers.list = followers.list.filter(id => id.toString() !== ctx.state.user._id)
        await following.save()
        await followers.save()
        ctx.body = 204
    }
    getFollowing = async (ctx) => {
        const { following: following_id } = await User.findById(ctx.params.id).select('following')
        const following = await Following.findById(following_id).populate('list')
        ctx.body = following
    }
    getFollowers = async (ctx) => {
        const { followers: followers_id } = await User.findById(ctx.params.id).select('followers')
        const followers = await Follower.findById(followers_id).populate('list')
        ctx.body = followers
    }
}

module.exports = new UserCtl()