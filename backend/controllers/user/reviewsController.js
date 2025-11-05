import { Review } from "../../models/index.js";
import Appointment from "../../models/Appointment.js";

// Create a new review (user only, one per completed booking)
export const createReview = async (req, res) => {
  try {
    const { serviceId, bookingId, rating, comment, images } = req.body;

    if (!serviceId || !bookingId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin bắt buộc (serviceId, bookingId, rating)",
      });
    }

    // Verify booking belongs to user and is completed
    const booking = await Appointment.findById(bookingId);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy lịch đặt" });
    }

    if (String(booking.customerId) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Bạn không có quyền đánh giá lịch đặt này",
      });
    }

    if (booking.status !== "completed") {
      return res.status(400).json({
        success: false,
        message: "Chỉ có thể đánh giá lịch đã hoàn thành",
      });
    }

    // Ensure one review per booking
    const existed = await Review.findOne({ booking: bookingId });
    if (existed) {
      return res.status(409).json({
        success: false,
        message: "Bạn đã đánh giá lịch này trước đó",
        data: existed,
      });
    }

    const review = await Review.create({
      service: serviceId,
      booking: bookingId,
      user: req.user._id,
      rating,
      comment,
      images: images || [],
    });

    return res.status(201).json({ success: true, data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Public: list reviews by service
export const getReviewsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const reviews = await Review.find({ service: serviceId })
      .sort({ createdAt: -1 })
      .populate("user", "name avatar")
      .lean();
    return res.json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// User: get review by booking (for current user)
export const getMyReviewByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const review = await Review.findOne({
      booking: bookingId,
      user: req.user._id,
    }).lean();

    return res.json({ success: true, data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  createReview,
  getReviewsByService,
  getMyReviewByBooking,
};
