import express from "express";
const router = express.Router();
import {
  createTicket,
  getTickets,
  getTicketById,
  createNote,
  updateToCollected,
  updateToPaid,
  updateToCompleted,
//   archiveTicket,
} from "../controllers/ticketController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// POST to /api/tickets/.
router.post("/", protect, createTicket);

// GET to /api/tickets/my-tickets
router.get("/", protect, getTickets);

// GET to /api/tickets/my-tickets
router.get("/:id", protect, getTicketById);

// POST to /api/tickets/:id/notes
router.post("/:id/notes", protect, createNote);

// PUT to /api/tickets/:id/collect
router.put("/:id/collect", protect, updateToCollected);

// PUT to /api/tickets/:id/pay
router.put("/:id/pay", protect, admin, updateToPaid);

// PUT to /api/tickets/:id/complete
router.put("/:id/complete", protect, updateToCompleted);

// PUT to /api/tickets/:id/complete
// router.put("/:id/archive", protect, updateToCompleted);

export default router;
