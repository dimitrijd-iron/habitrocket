mongoose = require("mongoose");
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  description: String,
  dateTimeRegistered: { type: Date, default: Date.now },
  frequency: String,
  cueTime: String, // 07:77 format
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

console.log(Habit);
