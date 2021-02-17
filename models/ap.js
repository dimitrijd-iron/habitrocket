mongoose = require("mongoose");
const Schema = mongoose.Schema;

const apSchema = new Schema({
  email: { type: String, required: "Email is required" },
  name: { type: String, required: "Name is required" },
  dateTimePush: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  dateTimeVerified: { type: Date, default: Date.now },
});

const Ap = mongoose.model("Ap", apSchema);
module.exports = Ap;
