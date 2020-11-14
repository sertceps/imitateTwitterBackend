const jwt = require('jsonwebtoken')
const Tweet = require('../models/Tweet')
const User = require('../models/User')

class TweetCtl {
    setTweet = async (ctx) => {
        if (ctx.header.authorization == undefined) { ctx.throw(401, '登录错误') }
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const user = await User.findById(_id)
        const tweet = new Tweet(ctx.request.body)
        tweet.author = _id
        await tweet.save()
        user.tweet.tweets.push(tweet._id)
        await user.save()
        ctx.body = { "message": "tweet success" }
    }
    getTweet = async (ctx) => {
        if (ctx.header.authorization == undefined) { ctx.throw(401, '登录错误') }
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        if (ctx.params.id) {
            const tweets = await Tweet.find({ author: ctx.params.id })
            ctx.body = tweets
        }
    }
    setComment = async (ctx) => {
        if (ctx.header.authorization == undefined) { ctx.throw(401, '登录错误') }
        const token = ctx.header.authorization.split(' ')[1]
        const { _id } = jwt.verify(token, 'secretKey')
        const user = await User.findById(_id)
        const comment = new Tweet(ctx.request.body)
        comment.author = _id
        const tweet = await Tweet.findById(ctx.params.id)
        tweet.comments.push(comment.id)
        await comment.save()
        await tweet.save()
        user.tweets.push(comment._id)
        await user.save()
        ctx.body = { "message": "tweet success" }
    }
    getComment = async (ctx) => {
        const tweet = await Tweet.findById(ctx.params.id).populate('comments').exec()
        ctx.body = await tweet
    }
    updateLikes = async (ctx) => {
        const tweet = await Tweet.findById(ctx.params.id)
        tweet.info.likes.count += 1
        await tweet.save()
        ctx.body = tweet
    }
}

module.exports = new TweetCtl()