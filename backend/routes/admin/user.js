// routes/admin/user.js
import express from "express";
import { authenticate, requireAdmin } from "../../middleware/auth.js";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadAvatar,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserStats,
} from "../../controllers/admin/userController.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticate);
router.use(requireAdmin);

// User profile routes
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.put("/change-password", changePassword);
router.put("/avatar", uploadAvatar);

// Admin CRUD routes for users
router.get("/", getUsers);
router.get("/stats", getUserStats);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
