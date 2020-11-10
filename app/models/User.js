const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
    },
    intro: {
        type: String,
        default: ''
    },
    tweets: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
            select: false
        }],
    },
    followers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            select: false
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
        ref: 'Fans',
    },
    blocks: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            select: false
        }]
    }

})

module.exports = model('User', userSchema)