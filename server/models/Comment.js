import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  ticketId: String,
  postedByUser: String,
  description: String,
});

let Comment = mongoose.model("Comment", commentSchema);

module.exports = { commentSchema, Comment };
