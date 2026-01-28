import express from "express";
import * as ticketController from "../controllers/Ticket.js";
import sessionMiddleware from "../middleware/jwtCheck.js";

const router = express.Router();

router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicketById);
router.post("/", sessionMiddleware, ticketController.createTicket);
router.put("/:id", sessionMiddleware, ticketController.updateTicket);
router.delete("/:id", sessionMiddleware, ticketController.deleteTicket);

export default router;
