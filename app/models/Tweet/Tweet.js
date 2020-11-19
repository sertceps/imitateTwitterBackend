const { Schema, model } = require('mongoose')
const tweetSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
    likers_count: {
        type: Number,
        default: 0,
        min: 0
    },
    retweeters_count: {
        type: Number,
        default: 0,
        min: 0
    },
    comments_count: {
        type: Number,
        default: 0,
        min: 0
    },
    likers_r: {
        type: Schema.Types.ObjectId,
        ref: 'Liker'
    },
    retweeters_r: {
        type: Schema.Types.ObjectId,
        ref: 'Retweeter'
    },
    comments_r: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    is_del: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = model('Tweet', tweetSchema)