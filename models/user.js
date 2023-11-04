const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'Email validation failed.'
        // }
    },
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],  
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  })

const User = model('User', userSchema)

module.exports = User