const express = require("express");
const commentController = require("../controllers/Comment");
const jwtCheck = require("../middleware/jwtCheck");

const router = express.Router();

router.get("/:ticket_id", commentController.getTicketComments);
router.post("/:ticket_id", jwtCheck, commentController.addCommentToTicket);
router.put("/:comment_id", jwtCheck, commentController.updateComment);
router.delete("/:comment_id", jwtCheck, commentController.deleteComment);

module.exports = router;
