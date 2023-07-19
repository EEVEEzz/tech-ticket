import express from "express";
const router = express.Router();
import { createClient, getClients, getClient } from "../controllers/clientController.js";
import { protect, admin } from '../middleware/authMiddleware.js'

// GET to /api/clients
router.get("/", protect, admin, getClients);

// POST to /api/clients
router.post("/", protect, admin, createClient);

// GET to /api/clients/:id
router.get("/:id", protect, admin, getClient);

export default router;
