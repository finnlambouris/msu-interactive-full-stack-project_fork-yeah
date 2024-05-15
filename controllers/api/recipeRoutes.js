const router = require('express').Router();
const { Recipe } = require('../../models/index.js');

// /api/recipes GET route
router.get("/", async (req, res) => {
    const recipeData = await Recipe.findAll();
    res.json(recipeData);
});

module.exports = router;