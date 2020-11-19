const jwt = require('jsonwebtoken')
const Tweet = require('../models/Tweet/Tweet')
const Tweet_r = require('../models/Tweet/Tweet-r')
const User = require('../models/User/User')
const Comment = require('../models/Tweet/Comment')
const Liker = require('../models/Tweet/Liker')
const Retweeter = require('../models/Tweet/Retweeter')

class TweetCtl {
    createTweet = async (ctx) => {
        const tweet = new Tweet(ctx.request.body)
        tweet.author = ctx.state.user._id
        tweet.likers_r = await new Liker({ onwer_id: tweet._id }).save()
        tweet.comments_r = await new Comment({ onwer_id: tweet._id }).save()
        tweet.retweeters_r = await new Retweeter({ onwer_id: tweet._id }).save()
        tweet.save()
        return tweet
    }
    setTweet = async (ctx) => {
        const tweet = await this.createTweet(ctx)
        const tweets_r = await Tweet_r.findOne({ onwer_id: ctx.state.user._id })
        // tweet_r 找不到会导致报错
        tweets_r.list.push(tweet._id)
        tweets_r.save()
        ctx.status = 204
    }
    getTweet = async (ctx) => {
        // 需要中间件check 一下
        const tweets_r = await Tweet_r.findOne({ onwer_id: ctx.params.id }).populate('list')
        ctx.body = tweets_r
    }
    setComment = async (ctx) => {
        // 需要中间件 check 一下
        const comment = await this.createTweet(ctx)
        const comment_r = await Comment.findOne({ onwer_id: ctx.params.id })
        // Comment 找不到会导致报错
        comment_r.list.push(comment)
        comment_r.save()
        ctx.body = comment_r
    }
    getComment = async (ctx) => {
        const comments = await Comment.findOne({ onwer_id: ctx.params.id }).select('list').populate('list')
        ctx.body = comments
    }
    updateLikes = async (ctx) => {
        const tweet = await Tweet.findById(ctx.params.id)
        tweet.info.likes.count += 1
        await tweet.save()
        ctx.body = tweet
    }
}

module.exports = new TweetCtl()