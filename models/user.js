const { Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    email: String,
    thoughts: Array,
    friends: Array
})