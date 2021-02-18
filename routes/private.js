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
    let cueDayTime = {};
    habit.Mon ? (cueDayTime["Mon"] = habit.MonTime) : "";
    habit.Tue ? (cueDayTime["Tue"] = habit.TueTime) : "";
    habit.Wed ? (cueDayTime["Wed"] = habit.WedTime) : "";
    habit.Thu ? (cueDayTime["Thu"] = habit.ThuTime) : "";
    habit.Fri ? (cueDayTime["Fri"] = habit.FriTime) : "";
    habit.Sat ? (cueDayTime["Sat"] = habit.SatTime) : "";
    habit.Sun ? (cueDayTime["Sun"] = habit.SunTime) : "";
    let createdAp = await Ap.create({
      name: habit.ApName,
      email: habit.ApEmail,
    });
    let createdHabit = await Habit.create({
      user: userId,
      description: habit.description,
      cueDayTime,
      ap: createdAp._id,
    });
    return createdHabit;
  } catch (err) {
    console.log(err);
  }
};

const updateHabit = async (habitId, habitUpdate) => {
  console.log("req.body---->>> \n", habitUpdate);
  console.log("habitId---->>> \n", habitId);
  try {
    const oldHabit = await Habit.findById(habitId);
    const updateAp = await Ap.findByIdAndUpdate(oldHabit.ap, {
      name: habitUpdate.ApName,
      email: habitUpdate.ApEmail,
    });
    const cueDayTime = {};
    habitUpdate.Mon ? (cueDayTime["Mon"] = habitUpdate.MonTime) : "";
    habitUpdate.Tue ? (cueDayTime["Tue"] = habitUpdate.TueTime) : "";
    habitUpdate.Wed ? (cueDayTime["Wed"] = habitUpdate.WedTime) : "";
    habitUpdate.Thu ? (cueDayTime["Thu"] = habitUpdate.ThuTime) : "";
    habitUpdate.Fri ? (cueDayTime["Fri"] = habitUpdate.FriTime) : "";
    habitUpdate.Sat ? (cueDayTime["Sat"] = habitUpdate.SatTime) : "";
    habitUpdate.Sun ? (cueDayTime["Sun"] = habitUpdate.SunTime) : "";
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, {
      user: oldHabit.user,
      description: habitUpdate.description,
      cueDayTime: cueDayTime,
      ap: oldHabit.ap,
    });
    return updatedHabit;
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
  let habitId = req.params.id;
  Habit.deleteOne({ _id: habitId })
    .then(() => res.redirect("/private/habit-dashboard"))
    .catch((err) => console.log(err));
  return;
});

privateRouter.get("/habit-update/:id", function (req, res, next) {
  let habitId = req.params.id;
  Habit.findById(habitId)
    .populate("ap")
    .then((habit) => {
      console.log(habit);
      res.render("private/habit-update", habit);
    })
    .catch((err) => console.log(err));
});

privateRouter.post("/habit-update/:id", function (req, res, next) {
  const habitId = req.params.id;
  const habitUpdate = req.body;
  updateHabit(habitId, habitUpdate)
    .then((habit) => {
      console.log("------updated:\n");
      console.log(habit);
      res.redirect("/private/habit-dashboard");
    })
    .catch((err) => console.log(err));
});

module.exports = privateRouter;
