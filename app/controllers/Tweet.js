const jwt = require('jsonwebtoken')
const Tweet = require('../models/Tweet/Tweet')
const Tweet_r = require('../models/Tweet/Tweet-r')
const Comment = require('../models/Tweet/Comment')
const Liker = require('../models/Tweet/Liker')
const Retweeter = require('../models/Tweet/Retweeter')
const Liked = require('../models/User/Liked')

class TweetCtl {
    createTweet = async (ctx, is_comment = false) => {
        const tweet = new Tweet(ctx.request.body)
        tweet.author = ctx.state.user._id
        tweet.likers_r = await new Liker({ onwer_id: tweet._id }).save()
        tweet.comments_r = await new Comment({ onwer_id: tweet._id }).save()
        tweet.retweeters_r = await new Retweeter({ onwer_id: tweet._id }).save()
        tweet.is_comment = is_comment
        tweet.content.retweet = ctx.params.id
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
    delItem = async (ctx) => {
        // ctx.state.user_id 未找到则报错
        await Tweet.findByIdAndUpdate(ctx.params.id, { $set: { is_del: true } })
        const tweets_r = await Tweet_r.findOne({ onwer_id: ctx.state.user._id })
        tweets_r.list = tweets_r.list.filter(id => id.toString() !== ctx.params.id)
        tweets_r.save()
    }
    delTweet = async (ctx) => {
        await this.delItem(ctx)
        ctx.status = 204
    }
    getTweet = async (ctx) => {
        const tweet = await Tweet.findById(ctx.params.id)
        ctx.body = tweet
    }
    getUserTweets = async (ctx) => {
        // 需要中间件check 一下
        const tweets_r = await Tweet_r.findOne({ onwer_id: ctx.params.id }).populate('list')
        ctx.body = tweets_r
    }
    setComment = async (ctx) => {
        // 需要中间件 check 一下
        const comment = await this.createTweet(ctx, true)
        const comment_r = await Comment.findOne({ onwer_id: ctx.params.id })
        comment_r.list.push(comment)
        comment_r.save()
        const tweets_r = await Tweet_r.findOne({ onwer_id: ctx.state.user._id })
        // list push 操作，未获取到会报错
        tweets_r.list.push(comment)
        tweets_r.save()
        await Tweet.findByIdAndUpdate(ctx.params.id, { $set: { comments_count: comment_r.list.length } })
        ctx.body = comment_r
    }
    getComment = async (ctx) => {
        const comments = await Comment.findOne({ onwer_id: ctx.params.id }).select('list').populate('list')
        ctx.body = comments
    }
    delComment = async (ctx) => {
        await this.delItem(ctx)
        // twitter 逻辑删除，个人 twitter 列表中删除，comments 列表不做处理
        ctx.status = 204
    }
    isInclude = async (list, id) => {
        if (!list.map(_id => _id.toString()).includes(id)) {
            return true
        }
        return false
    }
    setLiked = async (ctx) => {
        // check tweet 是否存在
        const liked = await Liked.findOne({ onwer_id: ctx.state.user._id })
        const notLiked = await this.isInclude(liked.list, ctx.params.id)
        if (!notLiked) {
            ctx.throw(409, '已点赞该推文')
        }
        liked.list.push(ctx.params.id)
        liked.save()
        const likers = await Liker.findOne({ onwer_id: ctx.params.id })
        const notLiker = await this.isInclude(likers.list, ctx.state.user._id)
        if (!notLiker) {
            ctx.throw(409, '已点赞该推文')
        }
        likers.list.push(ctx.state.user._id)
        likers.save()
        ctx.status = 204
    }
    unLiked = async (ctx) => {
        const liked = await Liked.findOne({ onwer_id: ctx.state.user._id })
        const likers = await Liker.findOne({ onwer_id: ctx.params.id })
        liked.list = liked.list.filter(id => id.toString() !== ctx.params.id)
        likers.list = likers.list.filter(id => id.toString() !== ctx.state.user._id)
        await likers.save()
        await liked.save()
        ctx.status = 204
    }
    getLiked = async (ctx) => {
        const liked = await Liked.findOne({ onwer_id: ctx.state.user._id })
        ctx.body = liked
    }
    getLikers = async (ctx) => {
        const likers = await Liker.findOne({ onwer_id: ctx.params.id })
        ctx.body = likers
    }
    setRetweet = async (ctx) => {
        const tweet = await this.createTweet(ctx)
        const tweets_r = await Tweet_r.findOne({ onwer_id: ctx.state.user._id })
        tweets_r.list.push(tweet._id)
        tweets_r.save()
        // push retweeter
        const retweeter = await Retweeter.findOne({ onwer_id: ctx.params.id })
        const notRetweeter = await this.isInclude(retweeter.list, ctx.state.user._id)
        if (!notRetweeter) {
            ctx.throw(409, '已转发该推文')
        }
        retweeter.list.push(ctx.state.user._id)
        retweeter.save()
        ctx.body = tweet
    }
    delRetweeter = async (ctx) => {
        await this.delItem(ctx)
        const retweeters = await Retweeter.findOne({ onwer_id: ctx.params.id })
        retweeters.list = retweeters.list.filter(id => id.toString() !== ctx.state.user._id)
        retweeters.save()
        ctx.status = 204
    }
    getRetweeters = async (ctx) => {
        const retweeters = await Retweeter.findOne({ onwer_id: ctx.params.id }).populate('list')
        ctx.body = retweeters
    }

    // 搜索

    searchTweet = async (ctx) => {
        const page = Math.max(Number(ctx.query.page), 1)
        const skipPage = page == NaN ? 0 : (page - 1) * 20
        const q = new RegExp(ctx.query.q)
        const tweets = await Tweet
            .find({ 'content.text': q })
            .limit(20).skip(skipPage)
        ctx.body = tweets
    }

}

module.exports = new TweetCtl()