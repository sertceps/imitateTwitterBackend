const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    onwer_id: {
        type: String,
        unique: true
    },
    follower: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
    }
})

module.exports = model('Comment', commentSchema)