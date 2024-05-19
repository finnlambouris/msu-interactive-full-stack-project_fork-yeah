const router = require('express').Router();

// /logout GET route
router.get("/", (req, res) => {
    try {
        // if the user is flagged as logged in, then they are logged out and redirected to the homepage
        if (req.session.logged_in) {
            req.session.destroy(() => {
                return res.redirect('/');
            });
        } else {
            return res.status(404).end();
        }
        
    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;