import mongoose from "mongoose";

export const commentSchema = mongoose.Schema({
  ticketId: mongoose.Types.ObjectId,
  postedByUser: mongoose.Types.ObjectId,
  description: String,
});

export const Comment = mongoose.model("Comment", commentSchema);
