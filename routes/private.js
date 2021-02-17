let express = require("express");
const privateRouter = express.Router();
const User = require("../models/user");
const Habit = require("../models/habit");
const Ap = require("../models/ap");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// TODO:s pwd conditions, need add code below
// const zxcvbn = require("zxcvbn");

// =====================================================
// =====================================================
// PRIVATE DASHBOARDS AND HABIT TRACKING
// =====================================================
// =====================================================

privateRouter.get("/habit-dashboard", function (req, res, next) {
  currentUser = req.session.currentUser;
  console.log(currentUser);

  Habit.find({ user: currentUser._id })
    .then((allHabits) => {
      const data = {
        allHabits: allHabits,
      };
      console.log("allHabits", data);

      for (habit of data.allHabits) {
        console.log("--------");
        console.log(habit);
      }

      // res.render("private/habit-dashboard", data);
    })
    .catch((err) => next(err));

  // res.render("private/habit-dashboard", { title: "HAbitRocket" });
});

module.exports = privateRouter;
