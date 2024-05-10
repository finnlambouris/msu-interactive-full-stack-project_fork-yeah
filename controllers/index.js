// controllers/index.js
const express = require('express');
const router = express.Router();

const apiRoutes = require('./api');

const signupRoutes = require('./signupRoutes.js');
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

// Define your routes here
router.use('/api', apiRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;