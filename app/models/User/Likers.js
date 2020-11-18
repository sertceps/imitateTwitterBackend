const { Schema, model } = require('mongoose')

const likerSchema = new Schema({
    onwer_id: {
        type: String,
        unique: true
    },
    list: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})

module.exports = model('Liker', likerSchema)