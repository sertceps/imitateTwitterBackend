const { Schema, model } = require('mongoose')

const likedSchema = new Schema({
    onwer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    list: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
    }
})

module.exports = model('Liked', likedSchema)