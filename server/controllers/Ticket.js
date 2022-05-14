const Ticket = require("../models/Ticket.js");
const mongoose = require("mongoose");
const _ = require("lodash");

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
 * Create a new ticket.
 * @param {*} req Contians the title, description and severity of the ticket
 * @param {*} res If the ticket is  created successfully, the body of res
 * contains the newly created ticket. If not, it'll have an error message.
 */
exports.createTicket = async (req, res) => {
  if (!req.auth) return res.status(401).json({ message: "Unauthorized." });

  if (!req.body.title || !req.body.description || !req.body.severity) {
    return res
      .status(400)
      .json({ message: "Full ticket information has to be provided." });
  }

  // Don't add the ticket if there's another ticket with the same title
  if (await Ticket.findOne({ title: req.body.title }))
    return res.status(400).json({
      message:
        "Post with the same title exists, please use a different title.",
    });

  const ticket = new Ticket({
    title: req.body.title,
    postedByUser: req.auth.email,
    description: req.body.description,
    severity: req.body.severity,
    taggedUsers: req.body.taggedUsers,
    comments: [],
    solved: false,
    attachments: req.body.attachments,
    solution: null,
    due: req.body.dueDate,
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
  if (req.body.title !== undefined && req.body.title === "")
    return res.status(400).json({ message: "The title cannot be empty." });

  const ticketWithReqTitle = await Ticket.findOne({
    title: req.body.title,
  });
  const ticketToUpdate = await Ticket.findById(id);

  // If the ticket is using a title that exists in the database already, return 400
  if (ticketWithReqTitle && !_.isEqual(ticketWithReqTitle, ticketToUpdate))
    return res.status(400).json({
      message:
        "A ticket with the same title already exists, please change the title",
    });

  // Update the ticket
  Ticket.findByIdAndUpdate(id, { ...req.body })
    .then(async (ticket) => {
      if (ticket) {
        return res.status(200).json(await Ticket.findById(id));
      }
      return res
        .status(404)
        .json({ message: "Could not find ticket with id = " + id });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message ?? "Could not update the ticket id = " + id,
      });
      return;
    });
};
