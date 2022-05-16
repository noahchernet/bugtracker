const mongoose = require("mongoose");
const commentSchema = require("./Comment").commentSchema;
const userSchema = require("./User").userSchema;

const ticketSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    postedByUser: { type: userSchema, required: true },
    description: { type: String, required: true },
    severity: { type: Number, required: true },
    comments: { type: [commentSchema] },
    solved: { type: Boolean, required: true },
    attachments: { type: String },
    solution: { type: [mongoose.Types.ObjectId] },
    due: { type: Date },
  },
  { timestamps: true }
);

let removedTicket = mongoose.model("RemovedTicket", ticketSchema);

module.exports = removedTicket;
