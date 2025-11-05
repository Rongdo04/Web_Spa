import express from "express";
import { authenticate } from "../../middleware/auth.js";
import {
  getMyBookings,
  getBookingById,
  cancelBooking,
  rescheduleBooking,
  getBookingStats,
} from "../../controllers/user/bookingsController.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/user/bookings - Lấy danh sách bookings của user hiện tại
router.get("/", getMyBookings);

// GET /api/user/bookings/stats - Lấy thống kê bookings
router.get("/stats", getBookingStats);

// GET /api/user/bookings/:id - Lấy chi tiết booking
router.get("/:id", getBookingById);

// PUT /api/user/bookings/:id/cancel - Hủy booking
router.put("/:id/cancel", cancelBooking);

// PUT /api/user/bookings/:id/reschedule - Đổi lịch booking
router.put("/:id/reschedule", rescheduleBooking);

export default router;
