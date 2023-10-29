const { Schema, model } = require('mongoose')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    // createdAt: {
    //     type: Date,
    //     createdAt: true,
    //     updatedAt: false,
    //     //getter method to format timestamp on query
    // },
    // username: {
    //     type: String,
    //     required: true
    // },
    // reactions: Array
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought