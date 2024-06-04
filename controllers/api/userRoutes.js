const router = require("express").Router();
const User = require("../../models/User.js");
const bcrypt = require("bcrypt");

// /api/users GET route
router.get("/", async (req, res) => {
  const userData = await User.findAll();
  res.json(userData);
});

// /api/users/login POST route
router.post("/login", async (req, res) => {
  try {
    // if the username entered by the user doesn't exist in the database, the login will fail
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      return res.status(404).json({ message: "Login failed" });
    }

    // if the password entered by the user doesn't match what exists in the database, the login will fail
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password,
    );
    if (!validPassword) {
      return res.status(404).json({ message: "Login failed" });
    }

    // the req.session is updated to save the user's ID and flags their status as logged_in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      return res.redirect("/profile");
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// /api/users/logout GET route
router.get("/logout", (req, res) => {
  try {
    // if the user is flagged as logged in, then they are logged out and redirected to the homepage
    if (req.session.logged_in) {
      req.session.destroy(() => {
        return res.redirect("/");
      });
    } else {
      return res.status(404).end();
    }
  } catch (err) {
    return res.status(400).json(err);
  }
});

// /api/users/signup POST route
router.post("/signup", async (req, res) => {
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
      return res.redirect("/profile");
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
