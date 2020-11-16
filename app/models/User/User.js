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
    followers: {
        type: Number,
        default: 0,
        min: 0
    },
    following: {
        type: Number,
        default: 0,
        min: 0,
    },
    followers_url: {
        type: String
    },
    following_url: {
        type: String,
    },
    blocking_url: {
        type: String,
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
})

module.exports = model('User', userSchema)