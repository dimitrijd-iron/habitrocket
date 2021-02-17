"use strict";

// MODULES
// model
const mongoose = require("mongoose");

// control
const express = require("express");
// control-middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// view
const hbs = require("hbs");
// const favicon = require("serve-favicon");  // TODO: add favicon

// dev & utils
const logger = require("morgan");
const createError = require("http-errors");
const path = require("path");

// SET-UP
// debug app_name: file message seutp
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// TODO:  env setup
// require("dotenv").config();

// setup up monngo
require("./configs/db.config");

// setup express
const app = express();

// setup logger
app.use(logger("dev"));

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

// tells to express to use the session function for cookies
// SESSION(COOKIES) MIDDLEWARE
app.use(
  session({
    secret: "mambojamboladygagafreddymercury",
    // cookie: { maxAge: 3600000 * 1 },	// 1 hour
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7, // Time to live - 7 days (14 days - Default)
    }),
  })
);

// VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// STATIC ASSETS
app.use(express.static(path.join(__dirname, "public")));

// TODO: add favicon
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// ROUTES SETUP
// TODO: write routes
const publicRouter = require("./routes/index");
app.use("/", publicRouter);
console.log(publicRouter);
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
console.log(authRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
