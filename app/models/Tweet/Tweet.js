const { Schema, model } = require('mongoose')
const tweetSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        text: {
            type: String,
            required: true,
        },
        images: {
            type: [{
                type: String
            }],
            maxlength: 4
        },
        video: {
            type: String
        },
        retweet: {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    },
    likers: {
        type: Number,
        default: 0,
        min: 0
    },
    retweeters: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: {
        type: Number,
        default: 0,
        min: 0
    },
    likers_url: {
        type: String
    },
    retweeters_url: {
        type: String
    },
    comments_url: {
        type: String
    },
    is_del: {
        type: Boolean,
        default: false
    }
})
module.exports = model('Tweet', tweetSchema)