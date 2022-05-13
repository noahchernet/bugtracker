const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    ticketId: { type: mongoose.Types.ObjectId, required: true },
    postedByUser: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment, commentSchema };
