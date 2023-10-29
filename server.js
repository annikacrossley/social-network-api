const express = require('express')
const db = require('./config/connection')

const { User, Thought } = require('./models')

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// USER ROUTES
// Get all users
app.get('api/users', async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result)
    } catch (err) {
        console.log('Something went wrong.')
        res.status(500).json({message: 'something went wrong'})
    }
})

// Get a single user by its _id
// app.get('api/users', async (req, res) => {
//     try {

//     } catch (err) {
//         console.log('Something went wrong.')
//         res.status(500).json({message: 'something went wrong'})
//     }
// })

// Post a new user 
app.post('api/users', async (req, res) => {
    const newUser = new User({ username: req.params.user }, {email: req.params.user});
    newUser.save();
    if (newUser) {
      res.status(200).json(newUser);
    } else {
      console.log('Something went wrong.');
      res.status(500).json({ message: 'something went wrong' });
    }
  });

// Put to update a user by its _id
app.post('api/users', async (req, res) => {
    try {
        const result = await User
          .findOneAndUpdate(
            { username: 'bananika' },
            { username: req.params.user },
            { new: true }
          );
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } catch (err) {
        console.log('Something went wrong.');
        res.status(500).json({ message: 'something went wrong' });
      }
    });

// Delete to remove a user by its _id
app.delete('/api/users', async (req, res) => {
    try {
      const result = await User.findOneAndDelete({ username: req.params.user });
      res.status(200).json(result);
      console.log(`Deleted ${result}`);
    } catch (err) {
      console.log('Something went wrong.');
      res.status(500).json({ message: 'something went wrong' });
    }
  });



db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  