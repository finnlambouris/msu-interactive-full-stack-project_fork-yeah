// controllers/index.js
const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');

const signupRoutes = require('./signupRoutes.js');
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

// const indexController = require('./controllers/index.js');
// const indexRouter = require('./controllers/index.js');

// Define your routes here
router.use('/api', apiRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

  // Create a new post 
    // req.body contains the post data
    // Save the post to the database
router.post('/posts', (req, res) => {
    res.send('Post created successfully');
});

// Get all posts from the database
router.get('/posts', (req, res) => {
    res.send('List of all posts');
});

// Get a single post by id
router.get('/posts/:id', (req, res) => {
    res.send('Post details');
});

    // Update a post by id
    // req.body contains the updated post data
    // Update the post in the database
router.put('/posts/:id', (req, res) => {
    res.send('Post updated successfully');
});

// Delete a post by id
router.delete('/posts/:id', (req, res) => {
    res.send('Post deleted successfully');
});

module.exports = router;