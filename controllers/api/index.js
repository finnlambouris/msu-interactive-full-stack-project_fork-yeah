const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const recipeRoutes = require("./recipeRoutes.js");

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;
