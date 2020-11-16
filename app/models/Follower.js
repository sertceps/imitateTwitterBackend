const { Schema, model } = require('mongoose')
const fanSchema = new Schema({
    fans: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'User'
        }]
    }
})

module.exports = model('Fan', fanSchema)