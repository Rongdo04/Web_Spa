import express from "express";
import { authenticate } from "../../middleware/auth.js";
import {
  createReview,
  getReviewsByService,
  getMyReviewByBooking,
} from "../../controllers/user/reviewsController.js";

const router = express.Router();

// Public endpoint to fetch reviews by service
router.get("/by-service/:serviceId", getReviewsByService);

// Authenticated user endpoints
router.get("/by-booking/:bookingId", authenticate, getMyReviewByBooking);
router.post("/", authenticate, createReview);

export default router;
