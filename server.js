const express = require('express')
const db = require('./config/connection')

const { User, Thought } = require('./models')

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// USER ROUTES
// User.create([
//     {
//         username: 'bananika',
//         email: 'bananika@mail.com'
//     },
//     {
//         username: 'zachary',
//         email: 'zach@mail.com'
//     },
//     {
//         username: 'sukiwuki',
//         email: 'suki@mail.com'
//     },
//     {
//         username: 'teague',
//         email: 'teague@mail.com'
//     }
// ]).then(
//     savedUser => console.log(savedUser)
// )

// User.updateOne({ username: 'zachary'}, {email: 'zachary@mail.com'})
//     .then(updatedItem => console.log(updatedItem))

// User.deleteOne ({username: 'teague'})
//     .then(result => console.log(result))


// THOUGHT ROUTES
// Thought.create({
    // username: ,
    // email:
// })

// Thought.updateOne({

// })

// Thought.delete({

// })

// REACTION ROUTES
// FRIEND LIST ROUTES

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  