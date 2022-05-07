import mongoose from "mongoose";
import User from "../models/User.js";

/**
 * Get all the users stored in the database
 * @param {*} req the request object, not used in the function
 * @param {*} res the response object, returns list of User objects fetched from the database
 */
export const getUsers = async (req, res) => {
  console.log("Getting all users...");
  const allUsers = await User.find();
  res.status(200).send(allUsers);
};

/**
 * Returns a user with the matching username, returns 402 if the user is not found
 * @param {*} req contains the username of the user
 * @param {*} res returns the found User object
 */
export const getUser = async (req, res) => {
  const { username } = req.params;
  console.log("The username is: " + username);
  User.findOne({ username })
    .then((user) => {
      if (user === null)
        return res.status(404).send({ message: "User is not found" });
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(402).send({ message: err.message });
    });
};
