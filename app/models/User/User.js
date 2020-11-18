const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    userid: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: 'USER',
        select: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    detail_info: {
        avatar_url: {
            type: String,
            default: '/images/avatars/default.jpg'
        },
        background_url: {
            type: String,
            default: '/images/backgrounds/default.jpg'
        },
        description: {
            type: String,
        },
        location: {
            type: String,
        },
        website: {
            type: String
        },
        birthday: {
            type: Date,
            default: Date.now
        },
    },
    tweets_url: {
        type: String
    },
    liked_url: {
        type: String
    },
    followers_count: {
        type: Number,
        default: 0,
        min: 0
    },
    following_count: {
        type: Number,
        default: 0,
        min: 0,
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'Following'
    },
    followers: {
        type: Schema.Types.ObjectId,
        ref: 'Follower'
    },
    blocking: {
        type: Schema.Types.ObjectId,
        ref: 'Blocking'
    },
    url: {
        type: String,
    },
    html_url: {
        type: String
    },
    isDel: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = model('User', userSchema)