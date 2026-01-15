import express from "express";
import * as commentController from "../controllers/Comment.js";
import jwtCheck from "../middleware/jwtCheck.js";

const router = express.Router();

router.get("/:ticket_id", commentController.getTicketComments);
router.post("/:ticket_id", jwtCheck, commentController.addCommentToTicket);
router.put("/:comment_id", jwtCheck, commentController.updateComment);
router.delete("/:comment_id", jwtCheck, commentController.deleteComment);

export default router;
