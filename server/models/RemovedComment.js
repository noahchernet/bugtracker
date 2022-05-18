const mongoose = require("mongoose");
const commentSchema = require("./Comment").commentSchema;

const RemovedComment = mongoose.model("RemovedComment", commentSchema);
module.exports = RemovedComment;
