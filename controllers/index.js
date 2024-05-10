// controllers/index.js
const express = require('express');
const router = express.Router();

const loginRoutes = require('./loginRoutes.js');
const apiRoutes = require('./api');

// Define your routes here
router.use('/', loginRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;