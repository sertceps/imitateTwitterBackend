const { Schema, model } = require('mongoose')

const followingSchema = new Schema({
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

module.exports = model('Following', followingSchema)