let express = require("express");
const privateRouter = express.Router();
const User = require("../models/user");
const Habit = require("../models/habit");
const Ap = require("../models/ap");
const CalendarUtil = require("../public/javascripts/calendar");
const HabitReshaper = require("../public/javascripts/helper");
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
  const habitId = req.params.id;
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  habitSummary(habitId)
    .then((data) => {
      const dataWithCalendar = {
        data: data[0],
        calendar: CalendarUtil.buildCalendar(year, month),
      };
      res.render("private/habit-track", dataWithCalendar);
      CalendarUtil.decorate(2021, 1, "red");
    })
    .catch((err) => console.log(err));
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
    let createdAp = await Ap.create({
      name: habit.ApName,
      email: habit.ApEmail,
    });
    let createdHabit = await Habit.create({
      user: userId,
      description: habit.description,
      cueDayTime: habitReshaper(habit),
      ap: createdAp._id,
    });
    return createdHabit;
  } catch (err) {
    console.log(err);
  }
};

const updateHabit = async (habitId, habitUpdate) => {
  try {
    const oldHabit = await Habit.findById(habitId);
    const updateAp = await Ap.findByIdAndUpdate(oldHabit.ap, {
      name: habitUpdate.ApName,
      email: habitUpdate.ApEmail,
    });
    const updatedHabit = await Habit.findByIdAndUpdate(habitId, {
      user: oldHabit.user,
      description: habitUpdate.description,
      cueDayTime: HabitReshaper(habitUpdate),
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
      res.render("private/habit-update", habit);
    })
    .catch((err) => console.log(err));
});

privateRouter.post("/habit-update/:id", function (req, res, next) {
  const habitId = req.params.id;
  const habitUpdate = req.body;
  updateHabit(habitId, habitUpdate)
    .then((habit) => {
      res.redirect("/private/habit-dashboard");
    })
    .catch((err) => console.log(err));
});

module.exports = privateRouter;
