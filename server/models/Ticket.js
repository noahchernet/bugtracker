import mongoose from "mongoose";
import { commentSchema } from "./Comment.js";

const ticketSchema = mongoose.Schema({
  title: String,
  postedByUser: mongoose.Types.ObjectId,
  description: String,
  severity: Number,
  taggedUsers: [mongoose.Types.ObjectId],
  comments: [commentSchema],
  solved: Boolean,
  attachments: [],
  solution: mongoose.Types.ObjectId,
  due: Date,
});

let Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
