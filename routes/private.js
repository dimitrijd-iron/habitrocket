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
  console.log("in private dashboard");
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
      res.redirect(`/private/habit-track/${habitId}`);
    })
    .catch((err) => console.log(err));
});

privateRouter.get("/habit-add", function (req, res, next) {
  console.log("~~~~ GET /habit/add ~~~~");
  res.render(`private/habit-form`);
});

privateRouter.post("/habit-add", function (req, res, next) {
  console.log("~~~ POST /habit/add ~~~");
  let data = req.body;
  let user = req.session.currentUser._id;
  console.log("=========>>>>>>", data);
  let description = data.description;
  let cueTime = [];
  let cueDay = [];
  data.Mon ? cueDay.push("Mon") && cueTime.push(data.MonTime) : "";
  data.Tue ? cueDay.push("Tue") && cueTime.push(data.TueTime) : "";
  data.Wed ? cueDay.push("Wed") && cueTime.push(data.WedTime) : "";
  data.Thu ? cueDay.push("Thu") && cueTime.push(data.ThuTime) : "";
  data.Fri ? cueDay.push("Fri") && cueTime.push(data.FriTime) : "";
  data.Sat ? cueDay.push("Sat") && cueTime.push(data.SatTime) : "";
  data.Sun ? cueDay.push("Sun") && cueTime.push(data.SunTime) : "";
  console.log(user, description, cueDay, cueTime);
  let newHabit = { user, description, cueDay, cueTime };
  Habit.create(newHabit)
    .then((createdHabit) => {
      console.log("added: ", createdHabit);
      res.redirect("/private/habit-dashboard");
    })
    .catch((err) => next(err));
});

module.exports = privateRouter;
