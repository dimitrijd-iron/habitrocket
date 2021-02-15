mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: "Name is required" },
  name: { type: String, required: "Email is required", unique: true },
  password: { type: String, required: "Password is required" },
  phone: String,
  tc: { type: Boolean, required: true },
  dateTimeSignup: { type: Date, default: Date.now },
  dateTimeUpdate: { type: Date, default: Date.now },
  dateTimeLogin: { type: Date, default: Date.now },
  // backlog:  location: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;

console.log(User);
