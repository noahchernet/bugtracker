const mongoose = require("mongoose");
const commentSchema = require("./Comment").commentSchema;

const ticketSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    postedByUser: { type: String, required: true }, // user's email
    description: { type: String, required: true },
    severity: { type: Number, required: true },
    taggedUsers: { type: [String] }, // emails of tagged users
    comments: { type: [commentSchema] },
    solved: { type: Boolean, required: true },
    attachments: { type: [] },
    solution: { type: [mongoose.Types.ObjectId] },
    due: { type: Date },
  },
  { timestamps: true }
);

let Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
