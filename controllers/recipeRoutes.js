const router = require('express').Router();
const { User, Recipe } = require('../models/index.js');

// /recipe GET route
router.get('/', async (req, res) => {
    res.render("upload-recipe");
})

// /recipe POST route
const {upload} = require('../storage/storage.js');
router.post('/', upload.single('recipePhoto'), async (req, res) => {
    const newRecipe = await Recipe.create({
        name: req.body.recipeName,
        ingredients: req.body.recipeIngredients,
        instructions: req.body.recipeInstructions,
        photo: req.file.path,
        user_id: req.session.user_id
    });
    return res.status(200).json(newRecipe);
});

// /recipe/:id GET route
router.get('/:id', async (req, res) => {
    const recipeData = await Recipe.findByPk(req.params.id, { include: {model: User} });
      const recipe = recipeData.get({ plain: true });
    
      if (req.session.logged_in) {
        return res.render("recipe", {
          recipe: recipe,
        });
      } else {
        return res.redirect("/login");
      }
});

module.exports = router;