const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    reactionId: Object,
    reactionBody: String,
    username: String,
    createdAt: Date
})