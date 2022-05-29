const Ticket = require("../models/Ticket");
const Comment = require("../models/Comment").Comment;
const RemovedTicket = require("../models/RemovedTicket");
const userFromAuth = require("../models/User").userFromAuth;
const mongoose = require("mongoose");
const _ = require("lodash");
const cloudinary = require("cloudinary");

/**
 * Get all or some tickets based on the query parameters
 * @param {*} req Empty or contains title, severity and/or solved parameter values
 * @param {*} res List of all tickets in database or selected tickets based on query parameters
 */
exports.getTickets = (req, res) => {
  const { title, severity, solved } = req.query;
  const conditions = {};
  if (title) {
    conditions["title"] = { $regex: new RegExp(title), $options: "i" };
  }
  if (severity) {
    conditions["severity"] = severity;
  }
  if (solved) {
    conditions["solved"] = solved;
  }

  Ticket.find(conditions)
    .then((tickets) => {
      if (!tickets)
        return res
          .status(404)
          .json({ message: "No tickets found with the provided parameters." });
      res.status(200).json(tickets);
    })
    .catch((err) =>
      res
        .status(500)
        .send(
          err ?? "An error has occurred while searching for the ticket(s)."
        )
    );
};

/**
 * Get a ticket by id
 * @param {*} req contains ticket
 * @param {*} res
 */
exports.getTicketById = (req, res) => {
  const { id } = req.params;

  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  Ticket.findById(id)
    .then((ticket) => {
      if (!ticket)
        return res
          .status(404)
          .json({ message: `Ticket with id ${id} not found` });
      return res.status(200).json(ticket);
    })
    .catch((err) => res.status(500).json(err));
};

/**
 * Create a new ticket.
 * @param {*} req Contians the title, description and severity of the ticket
 * @param {*} res If the ticket is  created successfully, the body of res
 * contains the newly created ticket. If not, it'll have an error message.
 */
exports.createTicket = async (req, res) => {
  if (!req.auth) return res.status(401).json({ message: "Unauthorized." });

  if (!req.fields.title || !req.fields.description || !req.fields.severity) {
    return res
      .status(400)
      .json({ message: "Full ticket information has to be provided." });
  }

  // Don't add the ticket if there's another ticket with the same title
  if (await Ticket.findOne({ title: req.fields.title }))
    return res.status(400).json({
      message:
        "Post with the same title exists, please use a different title.",
    });

  // Configure cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  let imgUrl = "";

  // If an image is included in the request, post it to Cloudinary and get the
  // image's URL to put in attachments
  if (Object.keys(req.files).length !== 0) {
    const result = await cloudinary.uploader.upload(
      req.files.attachments.path
    );
    imgUrl = result.url;
  }

  const ticket = new Ticket({
    title: req.fields.title,
    postedByUser: userFromAuth(req),
    description: req.fields.description,
    severity: req.fields.severity,
    comments: [],
    solved: false,
    attachments: imgUrl,
    solution: null,
    due: req.fields.dueDate,
  });

  ticket
    .save()
    .then((newPost) => {
      res.status(201).send(newPost);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err ?? "An error has occurred when creating the ticket.");
    });
};

/**
 * Updates an existing ticket.
 * @param {*} req Contains the new properties of the ticket
 * @param {*} res If updated successfully, returns the updated ticket.
 */
exports.updateTicket = async (req, res) => {
  if (!req.auth) return res.status(401).json({ message: "Unauthorized." });

  const { id } = req.params;

  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  // If the request body has a title field but it's an empty string, return 404
  if (req.fields.title !== undefined && req.fields.title === "")
    return res.status(400).json({ message: "The title cannot be empty." });

  const ticketWithReqTitle = await Ticket.findOne({
    title: req.fields.title,
  });
  const ticketToUpdate = await Ticket.findById(id);

  // If the ticket is using a title that exists in the database already, return 400
  if (ticketWithReqTitle && !_.isEqual(ticketWithReqTitle, ticketToUpdate))
    return res.status(400).json({
      message:
        "A ticket with the same title already exists, please change the title",
    });

  // Configure cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  let imgUrl = ticketToUpdate.attachments;

  // If an image is included in the request, post it to Cloudinary and get the
  // image's URL to put in attachments
  if (Object.keys(req.files).length !== 0) {
    const result = await cloudinary.uploader.upload(
      req.files.attachments.path
    );
    imgUrl = result.url;
  }

  // Set the comment if the comment's id is provided
  if (
    req.fields.solution !== undefined ||
    // req.fields.solution !== "" ||
    req.fields.solution !== null
  ) {
    // If the solution's comment id is not a valid ObjectId, return 404
    try {
      const comment = await Comment.findById(req.fields.solution);

      // Flag all of the comments as not the solution to the ticket
      await Comment.updateMany({ tiketId: id }, { solutionToTicket: false });
      await Comment.updateOne(
        { _id: req.fields.solution },
        { solutionToTicket: true }
      );
      req.fields.solved = true;
    } catch (err) {
      // Unmark any solution if solution is set empty or an invalid comment id
      // is set
      await Comment.updateOne(
        { _id: ticketToUpdate.solution },
        { solutionToTicket: false }
      );
      req.fields.solved = false;
      req.fields.solution = null;
    }
  }

  console.log("Handling solution done");

  // Update the ticket
  Ticket.findByIdAndUpdate(id, { ...req.fields, attachments: imgUrl })
    .then(async (ticket) => {
      if (ticket) {
        return res.status(200).json(await Ticket.findById(id));
      }
      return res
        .status(404)
        .json({ message: "Could not find ticket with id = " + id });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message ?? "Could not update the ticket id = " + id,
      });
    });
};

/**
 * Puts a ticket into the removedtickets collection
 * @param {*} req has the id of the ticket to be removed
 * @param {*} res upon successfull removal, 200 is returned, 400 otherwise
 */
exports.delete = async (req, res) => {
  if (!req.auth) return res.status(401).json({ message: "Unauthorized." });

  const { id } = req.params;

  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  const ticketToRemove = await Ticket.findById(id);
  if (!ticketToRemove) {
    return res
      .status(404)
      .json({ message: "Could not find ticket with id = " + id });
  }

  await Ticket.findByIdAndDelete(id);

  const removedTicket = new RemovedTicket(
    JSON.parse(JSON.stringify(ticketToRemove))
  );
  removedTicket
    .save()
    .then((removedTicket) => {
      if (removedTicket)
        return res
          .status(200)
          .json({ message: "Ticket " + id + " removed successfully" });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: error.message ?? "Could not remove ticket" });
    });
};
