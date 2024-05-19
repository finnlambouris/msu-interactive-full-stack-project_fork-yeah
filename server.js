// server.js
require("dotenv").config();
const path = require("path");
const sequelize = require("./config/connection.js");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// handlebars functionality
const expressHandlebars = require("express-handlebars");
const helpers = require("./utils/handlebarsHelpers.js");
const handlebars = expressHandlebars.create({ helpers: helpers });
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// sequelize session
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Use routes
const routes = require("./controllers/index.js");
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}!`)
  );
});
