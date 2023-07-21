import express from "express";
const router = express.Router();
import {
  createClient,
  getClients,
  getClient,
//   updateClient,
//   deleteClient,
} from "../controllers/clientController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// GET to /api/clients
router.get("/", protect, getClients);

// POST to /api/clients
router.post("/", protect, createClient);

// GET to /api/clients/:id
router.get("/:id", protect, getClient);

// admin only   routes
// router.put('/:id', protect, admin, updateClient)
// router.put('/:id', protect, admin, deleteClient)

export default router;
