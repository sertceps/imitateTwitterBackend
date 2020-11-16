const { Schema, model } = require('mongoose')

const likedSchema = new Schema({
    onwer_id: {
        type: String,
        unique: true
    },
    liked: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
    }
})

module.exports = model('Liked', likedSchema)