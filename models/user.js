mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: "Email is required", unique: true },
  name: { type: String, required: "Name is required" },
  password: { type: String, required: "Password is required" },
  mobile: String,
  tc: { type: Boolean, default: true },
  dateTimeSignup: { type: Date, default: Date.now },
  verified: { type: Boolean, default: true },
  dateTimeUpdate: { type: Date, default: Date.now },
  dateTimeLogin: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
