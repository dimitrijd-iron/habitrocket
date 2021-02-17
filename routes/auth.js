let express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// TODO: pwd conditions, need add code below
// const zxcvbn = require("zxcvbn");

// =====================================================
// =====================================================
// SIGNUP
// =====================================================
// =====================================================

/* GET signup. */
authRouter.get("/signup", function (req, res, next) {
  res.render("auth/signup", { title: "HAbitRocket" });
});

// Handle signup form data
// POST     /auth/signup
authRouter.post("/signup", (req, res, next) => {
  // Check if the email and password are provided
  const { email, password, name, mobile } = req.body;
  if (email === "" || password === "" || name === "") {
    res.render("auth/signup", {
      errorMessage: "Please enter name, email and password",
    });
    return;
  }
  //   Check if the email is taken
  User.findOne({ email })
    .then((user) => {
      // > if email is taken, display error message
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "There was an error, try again",
        });
        return;
      }
      // > if email is available, hash the password and create user
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      User.create({ email, name, password: hashedPassword, mobile })
        .then((createdUser) => {
          req.session.currentUser = createdUser;
          res.redirect(`/private/habit-dashboard`);
        })
        .catch((err) => {
          res.render("auth/signup", {
            errorMessage: "There was an error, please try again!",
          });
        });
    })
    .catch((err) => console.log(err));
});

// =====================================================
// =====================================================
// LOGIN
// =====================================================
// =====================================================

/* GET login. */
authRouter.get("/login", function (req, res, next) {
  res.render("auth/login", { title: "HAbitRocket" });
});

// Handle login form data
// POST     /auth/login
authRouter.post("/login", (req, res, next) => {
  // Check if the username and password are provided
  const { email, password } = req.body;
  if (email === "" || password === "") {
    // > if username or password are not provided
    res.render("auth/login", {
      errorMessage: "Please enter email and password",
    });
    return;
  }

  // Check if the username and user exists
  User.findOne({ email })
    .then((user) => {
      // > if user doesn't exist, show an error
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Indicate email and password",
        });
        return;
      }
      const passwordCorrect = bcrypt.compareSync(password, user.password);
      if (passwordCorrect) {
        req.session.currentUser = user;
        // res.redirect(`/`);
        res.redirect(`/private/habit-dashboard`);
      } else {
        res.render("auth/login", {
          errorMessage: "Indicate email and password",
        });
      }
    })
    .catch((err) => console.log(err));
});

// GET  /auth/logout
authRouter.get("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      next(err);
    } else {
      console.log("logging out");
      res.redirect("/");
    }
  });
});

module.exports = authRouter;
