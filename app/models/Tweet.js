const { Schema, model } = require('mongoose')
const tweetSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
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
    likecount: {
        type: Number,
        default: 0,
        min: 0
    },
    retweetcount: {
        type: Number,
        default: 0,
        min: 0
    },
    comments: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    isDel: {
        type: Boolean,
        default: 0,
        select: false
    }
})
module.exports = model('Tweet', tweetSchema)