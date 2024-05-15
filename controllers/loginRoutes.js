const router = require('express').Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

// /login GET route
router.get("/", (req, res) => {
    try {
        // if the user is already logged in, then they will be redirected to the homepage
        if (req.session.logged_in) {
            res.redirect("/");
        } 
        // if the user is not already logged in, then the login.handlebars file will be rendered
        else {
            return res.render("login");
        }

    } catch {
        return res.status(400).json(err);
    }
});

// /login POST route
router.post('/', async (req, res) => {
    try {
        // if the username entered by the user doesn't exist in the database, the login will fail
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            return res.status(404).json( {message: "Login failed"} );
        }

        // if the password entered by the user doesn't match what exists in the database, the login will fail
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!validPassword) {
            return res.status(404).json( {message: "Login failed"} );
        }

        // the req.session is updated to save the user's ID and flags their status as logged_in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            return res.status(200).json( {message: "User successfully logged in"} );
        });

    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;