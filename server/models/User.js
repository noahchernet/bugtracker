const mongoose = require("mongoose");

/**
 * Defines what a User's attributes are in the mongo database.
 * devType: junior, mid-level, senior, tech lead, etc.
 */
const userSchema = mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  picture: String, // url to image
});

let User = mongoose.model("User", userSchema);

module.exports = User;
