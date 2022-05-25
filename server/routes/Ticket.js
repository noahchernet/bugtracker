const express = require("express");
const ticketController = require("../controllers/Ticket.js");
const jwtCheck = require("../middleware/jwtCheck.js");

const router = express.Router();

router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", jwtCheck, ticketController.createTicket);
router.put("/:id", jwtCheck, ticketController.updateTicket);
router.delete("/:id", jwtCheck, ticketController.delete);

module.exports = router;
