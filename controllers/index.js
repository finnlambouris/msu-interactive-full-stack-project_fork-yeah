// controllers/index.js
const express = require('express');
const router = express.Router();
const { User, Recipe } = require('../models/index.js');

const apiRoutes = require('./api');

const signupRoutes = require('./signupRoutes.js');
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');
const recipeRoutes = require('./recipeRoutes.js');

// Define your routes here
router.use('/api', apiRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/recipe', recipeRoutes);

// / GET route
router.get('/', async (req, res) => {
  try {  
    const allRecipes = await Recipe.findAll({
        include: [{ model: User }],
    });
    const recipes = allRecipes.map((recipe) => recipe.get({ plain: true }));

    return res.render("homepage", { 
        logged_in: req.session.logged_in,
        recipes: recipes 
    });

  } catch (err) {
    return res.status(400).json(err);
  }
});

// /profile GET route
router.get("/profile", async (req, res) => {  
  try {
    if(req.session.logged_in) {
      const userRecipes = await Recipe.findAll({ 
        where: { user_id: req.session.user_id }, include: [{ model: User }], 
      });
      const recipes = userRecipes.map((post) => post.get({ plain: true }));
  
      res.render("profile", {
        logged_in: req.session.logged_in,
        recipes: recipes,
      });
      
    } else {
      res.redirect('/login');
    }
    
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;