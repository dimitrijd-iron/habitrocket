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
  res.render(`private/habit-form`);
});

const createHabit = async (habit, userId) => {
  try {
    let cueTime = [];
    let cueDay = [];
    habit.Mon ? cueDay.push("Mon") && cueTime.push(habit.MonTime) : "";
    habit.Tue ? cueDay.push("Tue") && cueTime.push(habit.TueTime) : "";
    habit.Wed ? cueDay.push("Wed") && cueTime.push(habit.WedTime) : "";
    habit.Thu ? cueDay.push("Thu") && cueTime.push(habit.ThuTime) : "";
    habit.Fri ? cueDay.push("Fri") && cueTime.push(habit.FriTime) : "";
    habit.Sat ? cueDay.push("Sat") && cueTime.push(habit.SatTime) : "";
    habit.Sun ? cueDay.push("Sun") && cueTime.push(habit.SunTime) : "";
    let createdAp = await Ap.create({
      name: habit.ApName,
      email: habit.ApEmail,
    });
    let createdHabit = await Habit.create({
      user: userId,
      description: habit.description,
      cueDay,
      cueTime,
      ap: createdAp._id,
    });
    return createdHabit;
  } catch (err) {
    console.log(err);
  }
};

privateRouter.post("/habit-add", function (req, res, next) {
  let data = req.body;
  let user = req.session.currentUser._id;
  createHabit(data, user).then(() => res.redirect("/private/habit-dashboard"));
  return;
});

privateRouter.get("/habit-delete/:id", function (req, res, next) {
  let habitID = req.params.id;
  Habit.deleteOne({ _id: habitId })
    .then(() => res.redirect("/private/habit-dashboard"))
    .catch((err) => console.log(err));
  return;
});

module.exports = privateRouter;
