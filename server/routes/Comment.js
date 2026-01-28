import express from "express";
import * as commentController from "../controllers/Comment.js";
import sessionMiddleware from "../middleware/jwtCheck.js";

const router = express.Router();

router.get("/:ticket_id", commentController.getTicketComments);
router.post("/:ticket_id", sessionMiddleware, commentController.addCommentToTicket);
router.put("/:comment_id", sessionMiddleware, commentController.updateComment);
router.delete("/:comment_id", sessionMiddleware, commentController.deleteComment);

export default router;
