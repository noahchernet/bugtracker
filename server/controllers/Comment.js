const Ticket = require("../models/Ticket");
const Comment = require("../models/Comment").Comment;
const RemovedComment = require("../models/RemovedComment");
const userFromAuth = require("../models/User").userFromAuth;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

/**
 * Add a comment to a ticket
 * @param {*} req contains the user who added the comment (in auth header) and
 * the contents of it
 * @param {*} res the newly added comment
 * @returns the newly added comment or an error
 */
exports.addCommentToTicket = async (req, res) => {
  if (!req.auth) return res.status(401).json({ message: "Unauthorized." });

  const { ticket_id } = req.params;

  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(ticket_id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  if (!req.fields.description) {
    return res.status(400).json({ message: "Comment is empty" });
  }

  const ticket = await Ticket.findById(ticket_id);
  if (!ticket)
    return res.status(404).json({ message: "Ticket could not be found" });

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

  // Get all comments of the required ticket to insert the new comment into
  const allComments = ticket.comments;

  const comment = new Comment({
    ticketId: ticket_id,
    postedByUser: userFromAuth(req),
    description: req.fields.description,
    attachments: imgUrl,
  });
  await comment.save();
  allComments.push(comment._id);

  Ticket.findByIdAndUpdate(ticket_id, { comments: allComments })
    .then((allComments) => {
      return res.status(201).json({
        message: "Comment added",
        comment,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

/**
 * Gets all the commments of a ticket
 * @param {*} req contains the id of the ticket
 * @param {*} res list of comments of the ticket
 */
exports.getTicketComments = async (req, res) => {
  const { ticket_id } = req.params;

  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(ticket_id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  const ticket = await Ticket.findById(ticket_id);
  if (!ticket)
    return res.status(404).json({ message: "Ticket could not be found" });

  const comments = [];

  for (let i = 0; i < ticket.comments.length; i++) {
    const comment = await Comment.findById(ticket.comments[i].toString());
    if (comment) comments.push(comment);
  }

  return res.status(200).json(comments);
};

/**
 * Updates a comment of a ticket
 * @param {*} req has id of the comment to be updated
 * @param {*} res the new comment, or an error
 */
exports.updateComment = async (req, res) => {
  if (!req.auth) return res.status(401).json({ message: "Unauthorized." });

  const { comment_id } = req.params;
  const { removeImage } = req.fields;

  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(comment_id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  // Don't update comment if description is empty
  if (req.fields.description === "" || req.fields.description === undefined)
    return res.status(404).json({ message: "Comment cannot be empty." });

  const comment = await Comment.findById(comment_id);
  if (!comment)
    return res.status(404).json({ message: "Comment could not be found" });

  if (!removeImage && Object.keys(req.files).length !== 0) {
    // Configure cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // If an image is included in the request, post it to Cloudinary and get the
    // image's URL to put in attachments
    if (Object.keys(req.files).length !== 0) {
      const result = await cloudinary.uploader.upload(
        req.files.attachments.path
      );
      comment.attachments = result.url;
    }
  }

  comment.description = req.fields.description;
  if (removeImage) comment.attachments = "";
  comment
    .save()
    .then((updatedComment) => {
      return res
        .status(200)
        .json({ message: "Comment updated", comment: updatedComment });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

/**
 * Delete a comment
 * @param {*} req contains id of comment to be deleted
 * @param {*} res 200 if successfully deleted, an error otherwise
 */
exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  // If the id is not a valid ObjectId, return 404
  try {
    mongoose.Types.ObjectId(comment_id);
  } catch (err) {
    return res.status(404).json({
      message: "id is invalid.",
    });
  }

  const commentToRemove = await Comment.findById(comment_id);
  if (!commentToRemove) {
    return res
      .status(404)
      .json({ message: "Could not find comment with id = " + comment_id });
  }

  // If the comment is the solution to the parent ticket,
  // make the ticket unsolved
  if (commentToRemove.solutionToTicket) {
    const parentTicket = await Ticket.findById(commentToRemove.ticketId);
    parentTicket.solution = null;
    parentTicket.solved = false;
    commentToRemove.solutionToTicket = false;
    await parentTicket.save();
    await commentToRemove.save();
  }
  await Comment.findByIdAndDelete(comment_id);

  const removedComment = new RemovedComment(
    JSON.parse(JSON.stringify(commentToRemove))
  );

  removedComment
    .save()
    .then(() => {
      return res
        .status(200)
        .json({ message: `Comment ${comment_id} removed successfully` });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};
