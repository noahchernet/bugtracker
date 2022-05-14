const express = require("express");
const ticketController = require("../controllers/Ticket.js");
const jwtCheck = require("../middleware/jwtCheck.js");

const router = express.Router();

router.get("/", ticketController.getTickets);
router.post("/", jwtCheck, ticketController.createTicket);
router.put("/:id", jwtCheck, ticketController.updateTicket);

module.exports = router;
