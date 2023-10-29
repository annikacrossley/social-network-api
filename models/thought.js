const { Schema } = require('mongoose')

const thoughtSchema = new Schema({
    thoughtText: String,
    createdAt: Date,
    username: String,
    reactions: Array
})