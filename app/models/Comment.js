const { Schema, model } = require('mongoose')
const commentSchema = new Schema({
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
    }
})

module.exports = model('Comment', commentSchema)