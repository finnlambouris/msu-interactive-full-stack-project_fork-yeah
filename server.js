// server.js
require('dotenv').config();
const path = require('path');
const sequelize = require('./config/connection.js');

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// handlebars functionality
const expressHandlebars = require("express-handlebars");
const handlebars = expressHandlebars.create({});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// sequelize session
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(session({
    secret: process.env.SECRET,
        cookie: {
            maxAge: 300000,
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        },
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({
            db: sequelize
        })
}));

// Use routes
const routes = require('./controllers/index.js');
app.use(routes);

app.get("/", (req, res) => {
    res.render("login")
});


sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}!`));
});