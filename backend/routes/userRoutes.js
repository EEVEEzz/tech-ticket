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

router.post("/register",  registerUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.route("/profile").get(protect, getUserProfile);
router.route("/profile").put(protect, updateUserProfile);

// admin routes
router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);

export default router;
