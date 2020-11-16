const jwt = require('jsonwebtoken')
const Tweet = require('../models/Tweet/Tweet')
const User = require('../models/User/User')

class TweetCtl {
    setTweet = async (ctx) => {
        const user = await User.findById(ctx.state.user_id)
        const tweet = new Tweet(ctx.request.body)
        tweet.author = ctx.state.user._id
        await tweet.save()
        user.tweet.tweets.push(tweet._id)
        await user.save()
        ctx.body = { "message": "tweet success" }
    }
    getTweet = async (ctx) => {
        if (ctx.params.id) {
            const tweets = await Tweet.find({ author: ctx.params.id })
            ctx.body = tweets
        }
    }
    setComment = async (ctx) => {
        const _id = ctx.state.user._id
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
        ctx.body = tweet
    }
    updateLikes = async (ctx) => {
        const tweet = await Tweet.findById(ctx.params.id)
        tweet.info.likes.count += 1
        await tweet.save()
        ctx.body = tweet
    }
}

module.exports = new TweetCtl()