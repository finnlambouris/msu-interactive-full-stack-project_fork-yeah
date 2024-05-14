const router = require('express').Router();
const { Photo } = require('../../models/index.js');

// /api/users GET route
router.get("/", async (req, res) => {
    const photoData = await Photo.findAll();
    res.json(photoData);
});

module.exports = router;