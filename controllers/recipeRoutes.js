const router = require("express").Router();
const { User, Recipe } = require("../models/index.js");

// /recipe GET route
router.get("/", async (req, res) => {
  try {
    return res.render("upload-recipe");
  } catch (err) {
    return res.status(400).json(err);
  }
});

// /recipe/:id GET route
router.get("/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: { model: User },
    });
    const recipe = recipeData.get({ plain: true });

    if (req.session.logged_in) {
      return res.render("recipe", {
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        recipe: recipe,
        isCreatedBy: recipeData.isCreatedBy(req.session.user_id),
      });
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;
