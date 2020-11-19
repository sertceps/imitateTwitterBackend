const { Schema, model } = require('mongoose')

const likerSchema = new Schema({
    onwer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    list: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})

module.exports = model('Liker', likerSchema)