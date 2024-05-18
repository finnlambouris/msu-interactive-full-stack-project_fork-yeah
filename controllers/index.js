// controllers/index.js
const express = require('express');
const router = express.Router();
const { User, Recipe } = require('../models/index.js');

const apiRoutes = require('./api');

const signupRoutes = require('./signupRoutes.js');
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

// Define your routes here
router.use('/api', apiRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

router.get('/', async (req, res) => {
    const allRecipes = await Recipe.findAll({
        include: [{ model: User }],
    });
    const recipes = allRecipes.map((recipe) => recipe.get({ plain: true }));

    return res.render("homepage", { 
        logged_in: req.session.logged_in,
        recipes: recipes 
    });
});

router.get("/profile", async (req, res) => {  
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
});

router.get('/recipe', async (req, res) => {
    res.render("upload-recipe");
})

const {upload} = require('../storage/storage.js');
router.post('/recipe', upload.single('recipePhoto'), async (req, res) => {
    const newRecipe = await Recipe.create({
        name: req.body.recipeName,
        ingredients: req.body.recipeIngredients,
        instructions: req.body.recipeInstructions,
        photo: req.file.path,
        user_id: req.session.user_id
    });
    return res.status(200).json(newRecipe);
});

  // Create a new post 
    // req.body contains the post data
    // Save the post to the database
router.post('/posts', (req, res) => {
    res.send('Post created successfully');
});

// Get all posts from the database
router.get('/posts', (req, res) => {
    res.send('List of all posts');
});

// Get a single post by id
router.get('/posts/:id', (req, res) => {
    res.send('Post details');
});

    // Update a post by id
    // req.body contains the updated post data
    // Update the post in the database
router.put('/posts/:id', (req, res) => {
    res.send('Post updated successfully');
});

// Delete a post by id
router.delete('/posts/:id', (req, res) => {
    res.send('Post deleted successfully');
});

module.exports = router;