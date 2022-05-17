const Ticket = require("../models/Ticket");
const Comment = require("../models/Comment").Comment;
const RemovedComment = require("../models/RemovedComment");
const userFromAuth = require("../models/User").userFromAuth;
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

exports.addCommentToTicket = async (req, res) => {
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

  if (!req.fields.description) {
    return res.status(400).json({ message: "Comment is empty" });
  }

  const ticket = await Ticket.findById(id);
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
    const result = await cloudinary.uploader.upload(req.files.image.path);
    imgUrl = result.url;
  }

  // Get all comments of the required ticket to insert the new comment into
  const allComments = ticket.comments;

  const comment = new Comment({
    ticketId: id,
    postedByUser: userFromAuth(req),
    description: req.fields.description,
    attachments: imgUrl,
  });
  await comment.save();
  console.log("Comment id: ", comment._id);
  allComments.push(comment._id);

  Ticket.findByIdAndUpdate(id, { comments: allComments })
    .then((allComments) => {
      return res.status(200).json({
        message: "Comment added",
        comment: allComments[allComments.length - 1],
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

exports.getTicketComments = (req, res) => {};
