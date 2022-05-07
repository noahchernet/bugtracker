import mongoose from "mongoose";
const { v4 } = require("uuid");

const ticketSchema = mongoose.Schema({
  ticketId: {
    type: String,
    default: v4(),
  },
  title: String,
  postedByUser: String,
  description: String,
  severity: Number,
  taggedUsers: [String],
  comments: [commentSchema],
  solved: Boolean,
  attachments: [],
  solution: commentSchema,
  due: Date,
});

let Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
