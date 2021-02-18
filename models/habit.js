mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  dateTimeRegistered: { type: Date, default: Date.now },
  cueDayTime: {},
  cueMedium: { type: String, default: "email" },
  ap: { type: Schema.Types.ObjectId, ref: "Ap" },
  push: [{ type: Date, default: Date.now }],
  punch: [{ type: Date, default: Date.now }],
});

const Habit = mongoose.model("habit", habitSchema);
module.exports = Habit;
