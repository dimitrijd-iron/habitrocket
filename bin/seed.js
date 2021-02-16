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
    phone: undefined,
    password: bcrypt.hashSync("marsismine", salt),
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
  },
  {
    email: "random-joe43673@google.com",
    name: "Joe Rand",
    phone: +15551234567,
    password: bcrypt.hashSync("1l0v3donuts!", salt),
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
  },
  {
    email: "dimitrijdugan@gmail.com",
    name: "Dimitrij Dugan",
    phone: +341234567,
    password: bcrypt.hashSync("!D0Agree0nTheD0nuts", salt),
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
  },
];

const apList = [
  { email: "jennyred@xkae.com", name: "Jenny Red", verified: true },
  { email: "soledad@xkae.com", name: "Soledad Garcia Garcia", verified: true },
  { email: "tomohiro@xkae.com", name: "Tanaka Tomohiro", verified: false },
];

const habitList = [
  {
    description: "floss",
    cueDay: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    cueTime: ["07:30", "07:30", "07:30", "07:30", "07:30", "09:00", "09:00"],
    cueMedium: "email",
  },
  {
    description: "post random stuff on Medium",
    cueDay: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    cueTime: ["18:30", "18:30", "18:30", "18:30", "18:30", "18:30", "18:30"],
    cueMedium: "email",
  },
  {
    description: "read a book recommended by Bill Gate",
    cueDay: ["Sat"],
    cueTime: "10:30",
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

    let ndx = 0;
    for (Person of userList) {
      await Ap.create({ user: Person._id, ...apList[ndx++] });
      let ndx1 = 0;
      for (OneHabit of habitList) {
        await Habit.create({
          user: Person._id,
          ...OneHabit,
          push: pushList[ndx1],
          punch: punchList[ndx1],
        });
        ndx1++;
      }
    }

    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
};

seedDB();
