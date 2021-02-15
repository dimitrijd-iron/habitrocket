const mongoose = require("mongoose");
const User = require("../models/user");
const Ap = require("../models/ap");
const Habit = require("../models/habit");

const users = [
  {
    email: "boss@mars-server-01.tezla.com",
    name: "Elon",
    phone: undefined,
    password: undefined,
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
    location: undefined,
  },
  {
    email: "random-joe43673@google.com",
    name: "Joe Rand",
    phone: +15551234567,
    password: undefined,
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
    location: undefined,
  },
  {
    email: "dimitrijdugan@gmail.com",
    name: "Dimitrij Dugan",
    phone: +341234567,
    password: undefined,
    tc: true,
    dateTimeSignup: undefined,
    dateTimeUpdate: undefined,
    dateTimeLogin: undefined,
    location: undefined,
  },
];

// const aps = [];

// const habits = [];

const dbRestart = function () {
  mongoose
    .connect(`mongodb://localhost/habitrocket-dev`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      // 2. DROP THE DATABASE TO CLEAR IT
      console.log("Connected to the DB");
      const pr = x.connection.dropDatabase();
      return pr;
    })
    .then(() => {
      // 3. CREATE THE USERS
      const pr = User.create(users);
      return pr;
    })
    .then((createdUsers) => {
      console.log(`Created ${createdUsers.length} users.`);
      mongoose.connection.close();
    })
    .catch((err) => console.log("Error connection to the DB", err));
};

dbRestart();
