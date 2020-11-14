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
    info: {
        likes: {
            count: {
                type: Number,
                default: 0,
                min: 0
            },
            likers: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        },
        retweet: {
            count: {
                type: Number,
                default: 0,
                min: 0
            }
        },
    },
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
    },
    flags: {
        isComment: {
            type: Boolean,
            default: 0,
            select: false
        },
        isDel: {
            type: Boolean,
            default: 0,
            select: false
        }
    }
})
module.exports = model('Tweet', tweetSchema)