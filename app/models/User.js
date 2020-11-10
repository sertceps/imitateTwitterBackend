const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    userid: {
        type: String,
        required: true
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
        type: [String]
    }
})
module.exports = model('User', userSchema)