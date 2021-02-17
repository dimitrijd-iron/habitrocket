let express = require("express");
const privateRouter = express.Router();
const User = require("../models/user");
const Habit = require("../models/habit");
const Ap = require("../models/ap");
const saltRounds = 10;

// =====================================================
// =====================================================
// PRIVATE DASHBOARDS AND HABIT TRACKING
// =====================================================
// =====================================================

const buildHabitSummary = async (user) => {
  try {
    return await Habit.find({ user: user._id }).populate("ap");
  } catch (err) {
    console.log(err);
  }
};

privateRouter.get("/habit-dashboard", function (req, res, next) {
  currentUser = req.session.currentUser;
  buildHabitSummary(currentUser).then((data) => {
    res.render("private/habit-dashboard", { habits: data });
  });
});

const habitSummary = async (habitId) => {
  try {
    return await Habit.find({ _id: habitId }).populate("ap");
  } catch (err) {
    console.log(err);
  }
};

privateRouter.get("/habit-track/:id", function (req, res, next) {
  habitId = req.params.id;
  habitSummary(habitId).then((data) => {
    res.render("private/habit-track", data[0]);
  });
});

privateRouter.get("/habit-punch/:id", function (req, res, next) {
  habitId = req.params.id;
  Habit.findByIdAndUpdate(habitId, { $push: { punch: Date.now() } })
    .then((x) => {
      console.log("habit:\n", x);
      console.log("habit:\n", x.description);
      res.redirect(`/private/habit-track/${habitId}`);
    })
    .catch((err) => console.log(err));
});

module.exports = privateRouter;
