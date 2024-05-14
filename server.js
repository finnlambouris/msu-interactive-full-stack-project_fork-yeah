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

// storage for photo uploads
const { storage } = require('./storage/storage');
const multer = require('multer');
const upload = multer({ storage });

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


// testing  
const { User, Recipe, Photo } = require('./models/index.js');
app.post('/upload', upload.single('image'), async (req, res) => {
    // const photoUrl = req.file.path;
    // console.log(photoUrl);
    // res.send('Done');

    const newPhoto = await Photo.create({
        url: req.file.path,
      });
      console.log(newPhoto);
      return res.status(200).json(newPhoto);
});

// Use routes
const routes = require('./controllers/index.js');
app.use(routes);

sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}!`));
});