import mongoose from "mongoose";
import User from "../models/User.js";

/**
 * Get all the users stored in the database
 * @param {*} req the request object, not used in the function
 * @param {*} res the response object, returns list of User objects fetched from the database
 */
export const getUsers = async (req, res) => {
  const allUsers = await User.find();
  res.status(200).send(allUsers);
};
