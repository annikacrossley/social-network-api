const { Schema, model } = require('mongoose')
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  })

const Thought = model('Thought', thoughtSchema)

module.exports = Thought