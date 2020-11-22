const Tweet = require('../models/Tweet/Tweet')
class FeedCtl {
    // 获取 推文并且按照时间排列
    getAllTweets = async (ctx) => {
        const page = Math.max(Number(ctx.query.page), 1)
        const skipPage = (page - 1) * 20
        const tweets = await Tweet.find().sort({ createdAt: -1 }).limit(20).skip(skipPage)
        ctx.body = tweets
    }

    getFollowingTweets = async (ctx) => {

    }


}

module.exports = new FeedCtl()
// 获取关注者的推文，按照时间排列