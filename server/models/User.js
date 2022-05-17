const mongoose = require("mongoose");

/**
 * Defines what a User's attributes are in the mongo database.
 * devType: junior, mid-level, senior, tech lead, etc.
 */
const userSchema = mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    picture: String, // url to image
  },
  { autoCreate: false }
);

const User = mongoose.model("User", userSchema);

/**
 * Creates a user based on Auth0's auth header
 * @param {*} req contains email, full name and profile picture of user
 * @returns new User model based on Auth0's auth header
 */
const userFromAuth = (req) => {
  return new User({
    email: req.auth.email,
    firstName: req.auth.given_name,
    lastName: req.auth.family_name,
    picture: req.auth.picture,
  });
};

module.exports = { User, userSchema, userFromAuth };
