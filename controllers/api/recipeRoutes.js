const router = require("express").Router();
const { Recipe } = require("../../models/index.js");
const { upload } = require("../../storage/storage.js");

// /api/recipes GET route
router.get("/", async (req, res) => {
  const recipeData = await Recipe.findAll();
  res.json(recipeData);
});

// /api/recipes POST route
router.post("/", upload.single("recipePhoto"), async (req, res) => {
  try {
    await Recipe.create({
      name: req.body.recipeName,
      ingredients: req.body.recipeIngredients,
      instructions: req.body.recipeInstructions,
      photo: req.file.path,
      user_id: req.session.user_id,
    });
    return res.redirect("/profile");
  } catch (err) {
    return res.status(400).json(err);
  }
});

// /api/recipes/:id DELETE route
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.destroy({ where: { id: req.params.id } });
    return res.status(200).end();
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
