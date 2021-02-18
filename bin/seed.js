const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Ap = require("../models/ap");
const Habit = require("../models/habit");

const salt = bcrypt.genSaltSync(5);

const users = [
  {
    email: "ceo@mars-server-01.jljl123.com",
    name: "John Locke",
    mobile: undefined,
    password: bcrypt.hashSync("marsismine", salt),
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
  },
  {
    email: "joe@joe.com",
    name: "Joe Rand",
    mobile: +15551234567,
    password: bcrypt.hashSync("12345", salt),
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
  },
  {
    email: "dimitrijdugan@gmail.com",
    name: "Dimitrij Dugan",
    mobile: +341234567,
    password: bcrypt.hashSync("!D0Agree0nTheD0nuts", salt),
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
  },
];

const aps = [
  { email: "jennyred@xkae.com", name: "Jenny Red", verified: true },
  { email: "soledad@xkae.com", name: "Soledad Garcia Garcia", verified: true },
  { email: "tomohiro@xkae.com", name: "Tanaka Tomohiro", verified: false },
];

const habits = [
  {
    description: "floss",
    cueDayTime: {
      Mon: "07:30",
      Tue: "07:30",
      Wed: "07:30",
      Thu: "07:30",
      Fri: "07:30",
      Sat: "09:00",
      Sun: "09:00",
    },
    cueMedium: "email",
  },
  {
    description: "post random stuff on Medium",
    cueDayTime: {
      Mon: "18:30",
      Tue: "18:30",
      Wed: "18:30",
      Thu: "18:30",
      Fri: "18:30",
      Sat: "18:30",
      Sun: "18:30",
    },
    cueMedium: "email",
  },
  {
    description: "read a book recommended by Bill Gate",
    cueDayTime: {
      Mon: undefined,
      Tue: undefined,
      Wed: undefined,
      Thu: undefined,
      Fri: undefined,
      Sat: "10:30",
      Sun: undefined,
    },
    cueMedium: "email",
  },
];

const pushList1 = [
  Date.parse("29 Jan 2021 07:30:00 GMT"),
  Date.parse("30 Jan 2021 07:30:00 GMT"),
  Date.parse("31 Jan 2021 07:30:00 GMT"),
  Date.parse("01 Jan 2021 07:30:00 GMT"),
  Date.parse("02 Jan 2021 07:30:00 GMT"),
  Date.parse("03 Jan 2021 07:30:00 GMT"),
  Date.parse("04 Jan 2021 07:30:00 GMT"),
  Date.parse("05 Jan 2021 07:30:00 GMT"),
  Date.parse("06 Jan 2021 07:30:00 GMT"),
  Date.parse("07 Jan 2021 07:30:00 GMT"),
  Date.parse("08 Jan 2021 07:30:00 GMT"),
  Date.parse("09 Jan 2021 07:30:00 GMT"),
];

const punchList1 = [
  Date.parse("29 Jan 2021 08:45:00 GMT"),
  Date.parse("30 Jan 2021 08:45:00 GMT"),
  Date.parse("31 Jan 2021 08:45:00 GMT"),
  Date.parse("01 Jan 2021 08:45:00 GMT"),
  Date.parse("02 Jan 2021 08:45:00 GMT"),
  // Date.parse("03 Jan 2021 08:45:00 GMT"),  // bad, bad!!
  Date.parse("04 Jan 2021 08:45:00 GMT"),
  Date.parse("05 Jan 2021 08:45:00 GMT"),
  // Date.parse("06 Jan 2021 08:45:00 GMT"),   // bad, bad!!
  Date.parse("07 Jan 2021 08:45:00 GMT"),
  Date.parse("08 Jan 2021 08:45:00 GMT"),
  Date.parse("09 Jan 2021 08:45:00 GMT"),
];

const pushList2 = [
  Date.parse("03 Jan 2021 18:30:00 GMT"),
  Date.parse("04 Jan 2021 18:30:00 GMT"),
  Date.parse("05 Jan 2021 18:30:00 GMT"),
  Date.parse("06 Jan 2021 18:30:00 GMT"),
  Date.parse("07 Jan 2021 18:30:00 GMT"),
  Date.parse("08 Jan 2021 18:30:00 GMT"),
  Date.parse("09 Jan 2021 18:30:00 GMT"),
];

const punchList2 = [
  // Date.parse("03 Jan 2021 23:55:00 GMT"),  // bad, bad!!
  Date.parse("04 Jan 2021 23:55:00 GMT"),
  Date.parse("05 Jan 2021 23:55:00 GMT"),
  // Date.parse("06 Jan 2021 23:55:00 GMT"),   // bad, bad!!
  Date.parse("07 Jan 2021 23:55:00 GMT"),
  Date.parse("08 Jan 2021 23:55:00 GMT"),
  Date.parse("09 Jan 2021 23:55:00 GMT"),
];

const pushList3 = [
  Date.parse("26 Dec 2020 10:30:00 GMT"),
  Date.parse("02 Jan 2021 10:30:00 GMT"),
  Date.parse("09 Jan 2021 10:30:00 GMT"),
  Date.parse("16 Jan 2021 10:30:00 GMT"),
  Date.parse("23 Jan 2021 10:30:00 GMT"),
  Date.parse("30 Jan 2021 10:30:00 GMT"),
  Date.parse("06 Feb 2021 10:30:00 GMT"),
  Date.parse("13 Feb 2021 10:30:00 GMT"),
];

const punchList3 = [
  Date.parse("26 Dec 2020 16:30:00 GMT"),
  Date.parse("02 Jan 2021 16:30:00 GMT"),
  Date.parse("09 Jan 2021 16:30:00 GMT"),
  // Date.parse("16 Jan 2021 16:30:00 GMT"),  // bad, bad
  // Date.parse("23 Jan 2021 16:30:00 GMT"),  // bad, bad
  Date.parse("30 Jan 2021 16:30:00 GMT"),
  Date.parse("06 Feb 2021 16:30:00 GMT"),
  Date.parse("13 Feb 2021 16:30:00 GMT"),
];

pushList = [pushList1, pushList2, pushList3];
punchList = [punchList1, punchList2, punchList3];

const seedDB = async () => {
  try {
    let conn = await mongoose.connect(`mongodb://localhost/habitrocket-dev`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await conn.connection.db.dropDatabase();
    let userList = await User.create(users);
    let apList = await Ap.create(aps);

    console.log("created aplist, created userlist");
    console.log(apList);

    for (Person of userList) {
      let ndx = 0;
      for (OneHabit of habits) {
        await Habit.create({
          user: Person._id,
          ...OneHabit,
          push: pushList[ndx],
          punch: punchList[ndx],
          ap: apList[ndx]._id,
        });
        ndx++;
      }
    }

    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
