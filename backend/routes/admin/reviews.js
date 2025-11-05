import express from "express";
import { authenticate, requireAdmin } from "../../middleware/auth.js";
import {
  getReviews,
  getReviewById,
  getReviewStats,
} from "../../controllers/admin/reviewsController.js";

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(authenticate);
router.use(requireAdmin);

// GET /api/admin/reviews - List all reviews with filtering and pagination
router.get("/", getReviews);

// GET /api/admin/reviews/stats - Get review statistics
router.get("/stats", getReviewStats);

// GET /api/admin/reviews/:id - Get single review by ID
router.get("/:id", getReviewById);

export default router;
