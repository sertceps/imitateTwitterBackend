const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    info: {
        password: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
        },
        avatar_url: {
            type: String,
            default: '/public/avatars/default_avatar'
        },
        birthday: {
            type: Date,
            default: Date.now
        },
        location: {
            type: String,
        },
        description: {
            type: String,
            default: ''
        },
    },
    tweet: {
        tweets: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'Tweet',
                select: false
            }],
        },
        likes: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Tweet',
                    select: false
                }
            ]
        },
    },
    relationship: {
        follows: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
                unique: true,
            }]
        },
        friends: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
                select: false
            }]
        },
        fans: {
            type: Schema.Types.ObjectId,
            ref: 'Fan',
        },
        blocks: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User',
                select: false
            }]
        }
    }
})

module.exports = model('User', userSchema)