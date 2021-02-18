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

const updateHabit = async (habitID, updatedHabitData) => {
  try {
    let cueDayTime = {};
    habit.Mon ? (cueDayTime["Mon"] = habit.MonTime) : "";
    habit.Tue ? (cueDayTime["Tue"] = habit.TueTime) : "";
    habit.Wed ? (cueDayTime["Wed"] = habit.WedTime) : "";
    habit.Thu ? (cueDayTime["Thu"] = habit.ThuTime) : "";
    habit.Fri ? (cueDayTime["Fri"] = habit.FriTime) : "";
    habit.Sat ? (cueDayTime["Sat"] = habit.SatTime) : "";
    habit.Sun ? (cueDayTime["Sun"] = habit.SunTime) : "";

    let updatedAp = await Ap.create({
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

privateRouter.get("/habit-update/:id", function (req, res, next) {
  let habitID = req.params.id;
  Habit.findById(habitId)
    .populate("ap")
    .then((habit) => {
      console.log(habit);
      res.render("private/habit-update", habit);
    })
    .catch((err) => console.log(err));
});

privateRouter.post("/habit-update/:id", function (req, res, next) {
  let habitID = req.params.id;
  console.log(habitID);
  console.log("-------req body:\n");
  console.log(req.body);
  Habit.findById(habitId)
    .populate("ap")
    .then((habit) => {
      console.log("------habit from mongo:\n");
      console.log(habit);

      res.redirect("/private/habit-dashboard");
    })
    .catch((err) => console.log(err));
});

module.exports = privateRouter;


[Object: null prototype] {
  description: 'floss sometimes',
  Mon: 'Mon',
  MonTime: '07:30',
  TueTime: '',
  Wed: 'Wed',
  WedTime: '07:30',
  Thu: 'Thu',
  ThuTime: '07:30',
  FriTime: '',
  Sat: 'Sat',
  SatTime: '09:00',
  Sun: 'Sun',
  SunTime: '09:00',
  ApName: 'Jenny Red',
  ApEmail: 'jennyred@xkae.com'
}
------habit from mongo:

{
  cueMedium: 'email',
  push: [
    2021-01-29T07:30:00.000Z,
    2021-01-30T07:30:00.000Z,
    2021-01-31T07:30:00.000Z,
    2021-01-01T07:30:00.000Z,
    2021-01-02T07:30:00.000Z,
    2021-01-03T07:30:00.000Z,
    2021-01-04T07:30:00.000Z,
    2021-01-05T07:30:00.000Z,
    2021-01-06T07:30:00.000Z,
    2021-01-07T07:30:00.000Z,
    2021-01-08T07:30:00.000Z,
    2021-01-09T07:30:00.000Z
  ],
  punch: [
    2021-01-29T08:45:00.000Z,
    2021-01-30T08:45:00.000Z,
    2021-01-31T08:45:00.000Z,
    2021-01-01T08:45:00.000Z,
    2021-01-02T08:45:00.000Z,
    2021-01-04T08:45:00.000Z,
    2021-01-05T08:45:00.000Z,
    2021-01-07T08:45:00.000Z,
    2021-01-08T08:45:00.000Z,
    2021-01-09T08:45:00.000Z
  ],
  _id: 602eab33de690edc61146772,
  user: 602eab32de690edc6114676a,
  description: 'floss',
  cueDayTime: {
    Mon: '07:30',
    Tue: '07:30',
    Wed: '07:30',
    Thu: '07:30',
    Fri: '07:30',
    Sat: '09:00',
    Sun: '09:00'
  },
  ap: {
    verified: true,
    _id: 602eab33de690edc6114676c,
    email: 'jennyred@xkae.com',
    name: 'Jenny Red',
    dateTimePush: 2021-02-18T18:00:19.016Z,
    dateTimeVerified: 2021-02-18T18:00:19.016Z,
    __v: 0
  },
  dateTimeRegistered: 2021-02-18T18:00:19.413Z,
  __v: 0
}
POST /private/habit-update/602eab33de690edc61146772 302 9.677 ms - 92
in private dashboard
GET /private/habit-dashboard 304 14.819 ms - -
GET /images/logo.png 304 6.059 ms - -