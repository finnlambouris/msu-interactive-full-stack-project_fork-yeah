const router = require('express').Router();
const User = require('../models/User.js');

// /signup POST route
router.post("/", async (req, res) => {
    try {
        // a user is created with the username and password entered by the user
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
    
        // the req.session is updated to save the user's ID and flags their status as logged_in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            return res.status(200).json(userData);
        });

    } catch (err) {
        res.status(400).json(err);
    }
});