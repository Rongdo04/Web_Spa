// routes/user/profile.js
import express from "express";
import { authenticate } from "../../middleware/auth.js";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  uploadAvatar,
  deleteAvatar,
} from "../../controllers/user/profileController.js";

const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticate);

// User profile routes
router.get("/", getUserProfile);
router.put("/", updateUserProfile);
router.put("/change-password", changePassword);
router.post("/avatar", uploadAvatar);
router.delete("/avatar", deleteAvatar);

export default router;
