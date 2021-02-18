var express = require("express");
var publicRouter = express.Router();

/* GET home page. */
publicRouter.get("/", function (req, res, next) {
  if (req.session.currentUser) {
    res.redirect("private/habit-dashboard");
  } else {
    res.render("index", { title: "HAbitRocket" });
  }
});

/* GET signup. */
publicRouter.get("/signup", function (req, res, next) {
  console.log("===================== get-signuup");
  res.render("auth/signup", { title: "HAbitRocket" });
});

module.exports = publicRouter;
