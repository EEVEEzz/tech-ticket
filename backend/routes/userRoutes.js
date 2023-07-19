import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/", registerUser);

export default router;
