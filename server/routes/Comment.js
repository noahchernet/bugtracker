const express = require("express");
const commentController = require("../controllers/Comment");
const jwtCheck = require("../middleware/jwtCheck");

const router = express.Router();

router.get("/:id", commentController.getTicketComments);
router.post("/:id", jwtCheck, commentController.addCommentToTicket);

module.exports = router;
