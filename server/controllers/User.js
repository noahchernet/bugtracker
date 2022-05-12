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
      res.status(500).send({ message: err.message });
    });
};

/**
 * Creates a user if the username is unique and all fields are provided in the
 * request body.
 * @param {*} req contains info about the new user
 * @param {*} res 403 if username is not unique or all fields are not provided,
 * 200 if the user is created successfully
 */
export const createUser = async (req, res) => {
  const { username, password, firstName, lastName, devType } = req.body;
  const userData = { username, password, firstName, lastName, devType };

  // Check if all fields are valid and non-empty.
  for (const [key, value] of Object.entries(userData)) {
    if (value === null || value === undefined || value === "") {
      return res.status(403).send({ message: key + " is not set." });
    }

    if (typeof value !== "string") {
      return res.status(403).send({ message: key + " is not a string." });
    }
  }

  // Check if the username is taken already.
  const foundUser = await User.findOne({ username: username });
  if (foundUser) {
    return res.status(403).send({ message: "username already in use" });
  }

  // Add the new user to the database
  User.create({ username, password, firstName, lastName, devType })
    .then((user) => {
      res.status(201).send({
        message: "User " + user.firstName + " " + user.lastName + " created.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

/**
 * Updates the properties of a user, excluding the username
 * @param {*} req contains the data to be updated, and the username of the user
 * @param {*} res the new properties of the user, 403 if none of the properties
 * are updated
 */
export const updateUser = async (req, res) => {
  const { username, password, firstName, lastName, devType } = req.body;
  const newUserData = { password, firstName, lastName, devType };
  let allNull = true;

  // Make sure username is provided
  if (!username)
    res.status(403).send({ message: "Username has to be provided." });

  // Return 403 if none of the fields are updated
  for (const [key, value] of Object.entries(newUserData)) {
    if (value !== null || value !== undefined || value !== "") {
      allNull = false;
      break;
    } else newUserData[key];
  }

  if (allNull) {
    res.status(403).send({ message: "At least one field has to be updated." });
  }

  // Check if all non-empty fields are string, if not respond with 403
  // because all fields need to be string
  for (const [key, value] of Object.entries(newUserData)) {
    if (typeof value !== "string") {
      res.status(403).send({ message: key + " has to be a string." });
    }
  }

  // Update the user with the new user data
  User.find({ username: username }).then((user) => {});
};
