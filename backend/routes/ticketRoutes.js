import express from "express";
const router = express.Router();
import {
  createTicket,
  getTickets,
  getTicketById,
} from "../controllers/ticketController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// GET to /api/tickets/my-tickets
router.get("/", protect, getTickets);

// GET to /api/tickets/my-tickets
router.get("/:id", protect, getTicketById);

// POST to /api/tickets/.
router.post("/", protect, createTicket);

export default router;
