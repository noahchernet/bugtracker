import Ticket from "../models/Ticket.js";

export const getTickets = (req, res) => {
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

export const createTicket = async (req, res) => {
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
        .status(400)
        .send(err ?? "An error has occurred when creating the ticket.");
    });
};
