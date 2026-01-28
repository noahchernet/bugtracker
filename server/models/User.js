import mongoose from "mongoose";

/**
 * Defines what a User's attributes are in the mongo database.
 * devType: junior, mid-level, senior, tech lead, etc.
 */
export const userSchema = mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    picture: String, // url to image
    sub: String, // Unique identifier for each user
  },
  { autoCreate: false },
);

export const User = mongoose.model("User", userSchema);

/**
 * Creates a user based on better-auth's session user
 * @param {*} req contains email, name and image of user from better-auth session
 * @returns new User model based on better-auth's session user
 */
export const userFromAuth = (req) => {
  const nameParts = req.user.name?.split(" ") || [""];
  return new User({
    email: req.user.email,
    firstName: nameParts[0] || "",
    lastName: nameParts.slice(1).join(" ") || "",
    picture: req.user.image,
    sub: req.user.id,
  });
};
