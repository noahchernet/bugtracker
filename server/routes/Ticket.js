import express from "express";
import * as ticketController from "../controllers/Ticket.js";
import jwtCheck from "../middleware/jwtCheck.js";

const router = express.Router();

router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", jwtCheck, ticketController.createTicket);
router.put("/:id", jwtCheck, ticketController.updateTicket);
router.delete("/:id", jwtCheck, ticketController.deleteTicket);

export default router;
