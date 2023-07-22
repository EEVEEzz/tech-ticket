import express from "express";
const router = express.Router();
import {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
} from "../controllers/clientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// GET to /api/clients
router.get("/", protect, getClients);

// POST to /api/clients
router.post("/", protect, createClient);

// GET to /api/clients/:id
router.get("/:id", protect, getClient);

// admin routes
router.route("/:id").delete(protect, admin, deleteClient);
router.route("/:id").put(protect, admin, updateClient);

export default router;
