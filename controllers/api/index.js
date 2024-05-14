const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const photoRoutes = require('./photoRoutes.js');

router.use('/users', userRoutes);
router.use('/photos', photoRoutes);

module.exports = router;