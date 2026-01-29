import mongoose from "mongoose";
import { commentSchema } from "./Comment.js";
import { userSchema } from "./User.js";

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
  { timestamps: true },
);

const RemovedTicket = mongoose.model("RemovedTicket", ticketSchema);

export default RemovedTicket;
