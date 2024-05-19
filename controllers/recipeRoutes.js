const router = require('express').Router();
const { User, Recipe } = require('../models/index.js');
const {upload} = require('../storage/storage.js');

// /recipe GET route
router.get('/', async (req, res) => {
  try {
    return res.render("upload-recipe");

  } catch (err) {
    return res.status(400).json(err);
  }
})

// /recipe POST route
router.post('/', upload.single('recipePhoto'), async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
        name: req.body.recipeName,
        ingredients: req.body.recipeIngredients,
        instructions: req.body.recipeInstructions,
        photo: req.file.path,
        user_id: req.session.user_id
    });
    return res.redirect('./profile');

  } catch (err) {
    return res.status(400).json(err);
  }
});

// /recipe/:id GET route
router.get('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, { include: {model: User} });
    const recipe = recipeData.get({ plain: true });
  
    if (req.session.logged_in) {
      return res.render("recipe", {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        recipe: recipe,
      });
    } else {
      return res.redirect("/login");
    }

  } catch (err) {
    return res.status(400).json(err);
  }
});

// /recipe/:id DELETE route
router.delete("/:id", async (req, res) => {
    try {
      const deletedRecipe = await Recipe.destroy({ where: { id: req.params.id } });
      return res.status(200).end();

    } catch (err) {
      return res.status(400).json(err);
    }
});

module.exports = router;