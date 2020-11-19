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
    tweets_r: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet_r'
    },
    liked_r: {
        type: Schema.Types.ObjectId,
        ref: 'Liked'
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
    following_r: {
        type: Schema.Types.ObjectId,
        ref: 'Following'
    },
    followers_r: {
        type: Schema.Types.ObjectId,
        ref: 'Follower'
    },
    blocking_r: {
        type: Schema.Types.ObjectId,
        ref: 'Blocking'
    },
    isDel: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = model('User', userSchema)