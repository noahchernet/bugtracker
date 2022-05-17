const express = require("express");
const commentController = require("../controllers/Comment");
const jwtCheck = require("../middleware/jwtCheck");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello");
});
router.post("/:id", jwtCheck, commentController.addCommentToTicket);

module.exports = router;
