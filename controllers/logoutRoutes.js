const router = require('express').Router();

// /logout GET route
router.get("/", (req, res) => {
    // if the user is flagged as logged in, then they are logged out and redirected to the homepage
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});