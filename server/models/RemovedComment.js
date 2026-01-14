import mongoose from "mongoose";
import { commentSchema } from "./Comment.js";

const RemovedComment = mongoose.model("RemovedComment", commentSchema);

export default RemovedComment;
