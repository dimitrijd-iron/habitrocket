mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  description: String,
  dateTimeRegistered: { type: Date, default: Date.now },
  cueDay: [String], // ["Mon", "Wed", "Thu"]
  cueTime: [String], // array matching cueDay 07:77 format, 24H, trailing zeros 23:59
  cueMedium: String,
  accountabilityPartner: {
    type: Schema.Types.ObjectId,
    ref: "AccountabilityPartner",
  },
  push: [{ type: Date, default: Date.now }],
  punch: [{ type: Date, default: Date.now }],
});

const Habit = mongoose.model("habit", habitSchema);
module.exports = Habit;
