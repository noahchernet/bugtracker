import mongoose from "mongoose";
import { userSchema } from "./User.js";

export const commentSchema = mongoose.Schema(
  {
    ticketId: { type: mongoose.Types.ObjectId, required: true },
    postedByUser: { type: userSchema, required: true },
    description: { type: String, required: true },
    attachments: { type: String },
    solutionToTicket: { type: Boolean },
  },
  { timestamps: true },
);

export const Comment = mongoose.model("Comment", commentSchema);
