const mongoose = require("mongoose");
const userSchema = require("../models/User").userSchema;

const commentSchema = mongoose.Schema(
  {
    ticketId: { type: mongoose.Types.ObjectId, required: true },
    postedByUser: { type: userSchema, required: true },
    description: { type: String, required: true },
    attachments: { type: String },
    solutionToTicket: {type: Boolean}
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment, commentSchema };
