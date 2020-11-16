const { Schema, model } = require('mongoose')

const followerSchema = new Schema({
    onwer_id: {
        type: String,
        unique: true
    },
    followers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})

module.exports = model('Follower', followerSchema)