class TweetCtl {
    setTweet = async (ctx) => {
        ctx.body = { "message": "tweet success" }
    }
}

module.exports = new TweetCtl()