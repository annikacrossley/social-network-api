const { Schema } = require('mongoose')

const reactionSchema = new Schema({
    // reactionId: {
    //     type: Object,
    //     default: //new ObjectId
    // },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        createdAt: true,
        updatedAt: false,
        //getter method to format the timestamp on query 
    }
})