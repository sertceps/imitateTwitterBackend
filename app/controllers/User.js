const User = require('../models/User/User')
const Follower = require('../models/User/Follower')
const Following = require('../models/User/Following')
const Blocking = require('../models/User/Blocking')
const Tweet_r = require('../models/Tweet/Tweet-r')
const Liked = require('../models/User/Liked')
const jwt = require('jsonwebtoken')
class UserCtl {
    createUser = async (value) => {
        // const user = new User(ctx.request.body)
        const user = new User(value)
        const onwer = { onwer_id: user._id }
        // 验证唯一性?
        user.tweets_r = await new Tweet_r(onwer).save()
        user.liked_r = await new Liked(onwer).save()
        user.followers_r = await new Follower(onwer).save()
        user.following_r = await new Following(onwer).save()
        user.blocking_r = await new Blocking(onwer).save()
        user.save()
        return user
    }
    register = async (ctx) => {
        await this.createUser(ctx.request.body)
        ctx.status = 204
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

    isInclude = async (list, id) => {
        if (!list.map(_id => _id.toString()).includes(id)) {
            return true
        }
        return false
    }
    updateCount = async (following_id, followers_id, following_count, followers_count) => {
        await User.findByIdAndUpdate(following_id, { $set: { following_count } })
        await User.findByIdAndUpdate(followers_id, { $set: { followers_count } })
    }

    setFollowing = async (ctx) => {
        const following_r = await Following.findOne({ onwer_id: ctx.state.user._id })
        const followers_r = await Follower.findOne({ onwer_id: ctx.params.id })
        const notFollowing = await this.isInclude(following_r.list, ctx.params.id)
        const notFollowers = await this.isInclude(followers_r.list, ctx.state.user._id)
        if (!notFollowing && !notFollowers) {
            ctx.throw(409, '已关注该用户')
        }
        if (notFollowing) {
            following_r.list.push(ctx.params.id)
            await following_r.save()
        }
        if (notFollowers) {
            followers_r.list.push(ctx.state.user._id)
            await followers_r.save()
        }
        await this.updateCount(ctx.state.user._id, ctx.params.id, following_r.list.length, followers_r.list.length)
        ctx.status = 204
    }
    unFollowing = async (ctx) => {
        // 需要check 一下
        const following_r = await Following.findOne({ onwer_id: ctx.state.user._id })
        const followers_r = await Follower.findOne({ onwer_id: ctx.params.id })
        following_r.list = following_r.list.filter(id => id.toString() !== ctx.params.id)
        followers_r.list = followers_r.list.filter(id => id.toString() !== ctx.state.user._id)
        await following_r.save()
        await followers_r.save()
        await this.updateCount(ctx.state.user._id, ctx.params.id, following_r.list.length, followers_r.list.length)
        ctx.status = 204
    }
    getFollowing = async (ctx) => {
        const following_r = await Following.findOne({ onwer_id: ctx.params.id }).populate('list')
        ctx.body = following_r
    }
    getFollowers = async (ctx) => {
        const followers_r = await Follower.findOne({ onwer_id: ctx.params.id }).populate('list')
        ctx.body = followers_r
    }
    getBlocking = async (ctx) => {
        const blocking_r = await Blocking.findOne({ onwer_id: ctx.state.user._id }).populate('list')
        ctx.body = blocking_r
    }
    setBlocking = async (ctx) => {
        const blocking_r = await Blocking.findOne({ onwer_id: ctx.state.user._id })
        const notBlocking = await this.isInclude(blocking_r.list, ctx.params.id)
        if (!notBlocking) {
            ctx.throw(409, '已拉黑用户')
        }
        blocking_r.list.push(ctx.params.id)
        blocking_r.save()
        ctx.status = 204
    }
    unBlocking = async (ctx) => {
        const blocking_r = await Blocking.findOne({ onwer_id: ctx.state.user._id })
        blocking_r.list = blocking_r.list.filter(id => id.toString() !== ctx.params.id)
        blocking_r.save()
        ctx.body = 204
    }
    searchUser = async (ctx) => {
        const page = Math.max(Number(ctx.query.page), 1)
        const skipPage = page == NaN ? 0 : (page - 1) * 20
        const q = new RegExp(ctx.query.q)
        const users = await User
            .find({ $or: [{ username: q }, { userid: q }] })
            .limit(20).skip(skipPage)
        ctx.body = users

    }

}

module.exports = new UserCtl()