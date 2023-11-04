const express = require('express')
const db = require('./config/connection')

const { User, Thought } = require('./models')

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// USER ROUTES
// Get all users
app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        console.log('Something went wrong.')
        res.status(500).json({message: 'something went wrong'})
    }
})

// Get a single user by its _id
app.get('/api/:userId', async (req, res) => {
    try {
        const result = await User.findOne({_id: req.params.user})
        .select('-__v')
        .populate('friends')
        .populate('thoughts');

        res.status(200).json(result)
    } catch (err) {
        console.log('Something went wrong.')
        res.status(500).json({message: 'something went wrong'})
    }
})

// Post a new user 
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
  });

// Put to update a user by its _id
app.put('/api/users', async (req, res) => {
    try {
        const result = await User
          .findOneAndUpdate(
            { _id: req.params.user },
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
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' });
    } 
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }}
  );

//Add a friend 
app.post('/api/:userId/friends/:friendId', async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { new: true }
    );

    if (!userData) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID' });
    }

    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

//remove a friend
app.delete('/api/:userId/friends/:friendId', async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!userData) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID' });
    }

    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})


// THOUGHT ROUTES
// Get all thoughts
app.get('/api/thoughts', async (req, res) => {
    try {
        const result = await Thought.find({});
        res.status(200).json(result)
    } catch (err) {
        console.log('Something went wrong.')
        res.status(500).json({message: 'something went wrong'})
    }
})

// Get a single thought by its _id
app.get('/api/thoughts', async (req, res) => {
    try {
        const result = await Thought.findOne({_id: req.params.thought})
        res.status(200).json(result)
    } catch (err) {
        console.log('Something went wrong.')
        res.status(500).json({message: 'something went wrong'})
    }
})

// Post a new thought 
app.post('/api/thoughts', async (req, res) => {
    try {const newThought = await Thought.create(req.body);

    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: {thoughts: newThought._id} },
      { new: true }
    )
    if (!userData) {
      return res.status(404).json({ message: 'Thought created but no user with this id!' });
    }

    res.json({ message: 'Thought successfully created!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });

// Put to update a thought by its _id
app.put('/api/thoughts', async (req, res) => {
    try {
        const result = await Thought
          .findOneAndUpdate(
            { _id: req.params.thought },
            { thoughtText: req.params.user },
            { new: true }
          );
        res.status(200).json(result);
        console.log(`Updated: ${result}`);
      } catch (err) {
        console.log('Something went wrong.');
        res.status(500).json({ message: 'something went wrong' });
      }
    });

// Delete to remove a thought by its _id
app.delete('/api/thoughts', async (req, res) => {
    try {
      const result = await Thought.findOneAndDelete({ _id: req.params.user });
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

module.exports = db;