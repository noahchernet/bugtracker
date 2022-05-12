import mongoose from "mongoose";

export const commentSchema = mongoose.Schema(
  {
    ticketId: { type: mongoose.Types.ObjectId, required: true },
    postedByUser: { type: mongoose.Types.ObjectId, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
