import express from "express";
import { createTicket, getTickets } from "../controllers/Ticket.js";
import jwtCheck from "../middleware/jwtCheck.js";

const router = express.Router();

router.get("/", getTickets);
router.post("/", jwtCheck, createTicket);

export default router;
