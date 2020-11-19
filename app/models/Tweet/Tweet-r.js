const { Schema, model } = require('mongoose')

const tweet_rSchema = new Schema({
    onwer_id: {
        type: String,
        unique: true
    },
    list: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }]
    }
})

module.exports = model('Tweet_r', tweet_rSchema)