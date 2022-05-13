const mongoose = require("mongoose");

/**
 * Defines what a User's attributes are in the mongo database.
 * devType: junior, mid-level, senior, tech lead, etc.
 */
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  devType: String,
});

let User = mongoose.model("User", userSchema);

module.exports = User;
