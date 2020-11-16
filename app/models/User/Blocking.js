const { Schema, model } = require('mongoose')

const blockingSchema = new Schema({
    onwer_id: {
        type: String,
        unique: true
    },
    blocking: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
})

module.exports = model('Blocking', blockingSchema)