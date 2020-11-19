const { Schema, model } = require('mongoose')

const followingSchema = new Schema({
    onwer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    list: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})

module.exports = model('Following', followingSchema)