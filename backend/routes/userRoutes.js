import express from "express";
const router = express.Router();
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/", registerUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);

// admin routes
router.route("/").get(protect, admin, getUsers);
router.route("/:id").get(protect, admin, getUser);
router.route("/:id").delete(protect, admin, deleteUser);
router.route("/:id").put(protect, admin, updateUser);

export default router;
