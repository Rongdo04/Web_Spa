import Appointment from "../../models/Appointment.js";
import Service from "../../models/Service.js";
import Staff from "../../models/Staff.js";

// GET /api/user/bookings - Lấy danh sách bookings của user hiện tại
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = { customerId: userId };

    if (status) {
      filter.status = status;
    }

    // Execute query with pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const bookings = await Appointment.find(filter)
      .populate("serviceId", "name description price duration images")
      .populate("staffId", "name avatar")
      .sort({ appointmentDate: -1, startTime: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalItems = await Appointment.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / parseInt(limit));

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error("Error getting user bookings:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy danh sách đặt lịch",
      error: error.message,
    });
  }
};

// GET /api/user/bookings/:id - Lấy chi tiết booking
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Appointment.findOne({
      _id: id,
      customerId: userId,
    })
      .populate("serviceId", "name description price duration images")
      .populate("staffId", "name avatar phone")
      .populate("customerId", "name phone email");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch đặt",
      });
    }

    res.json({
      success: true,
      data: { booking },
    });
  } catch (error) {
    console.error("Error getting booking details:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết lịch đặt",
      error: error.message,
    });
  }
};

// PUT /api/user/bookings/:id/cancel - Hủy booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    const booking = await Appointment.findOne({
      _id: id,
      customerId: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch đặt",
      });
    }

    // Check if booking can be cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Lịch đặt đã được hủy trước đó",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Không thể hủy lịch đặt đã hoàn thành",
      });
    }

    // Update booking status
    booking.status = "cancelled";
    booking.cancellationReason = reason;
    booking.cancelledAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: "Hủy lịch đặt thành công",
      data: { booking },
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi hủy lịch đặt",
      error: error.message,
    });
  }
};

// PUT /api/user/bookings/:id/reschedule - Đổi lịch booking
export const rescheduleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { newDate, newTime } = req.body;
    const userId = req.user.id;

    const booking = await Appointment.findOne({
      _id: id,
      customerId: userId,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch đặt",
      });
    }

    // Check if booking can be rescheduled
    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Không thể đổi lịch cho lịch đặt đã hủy",
      });
    }

    if (booking.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Không thể đổi lịch cho lịch đặt đã hoàn thành",
      });
    }

    // Validate new date and time
    if (!newDate || !newTime) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng cung cấp ngày và giờ mới",
      });
    }

    // Check if new date is in the future
    const newDateTime = new Date(`${newDate}T${newTime}`);
    if (newDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Ngày và giờ mới phải trong tương lai",
      });
    }

    // Update booking
    booking.appointmentDate = newDate;
    booking.startTime = newTime;
    booking.status = "pending"; // Reset to pending for admin approval
    booking.rescheduledAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: "Đổi lịch thành công. Lịch đặt đang chờ xác nhận",
      data: { booking },
    });
  } catch (error) {
    console.error("Error rescheduling booking:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi đổi lịch",
      error: error.message,
    });
  }
};

// GET /api/user/bookings/stats - Lấy thống kê bookings
export const getBookingStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Appointment.aggregate([
      { $match: { customerId: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalBookings = await Appointment.countDocuments({
      customerId: userId,
    });
    const totalSpent = await Appointment.aggregate([
      { $match: { customerId: userId, status: "completed" } },
      { $group: { _id: null, total: { $sum: "$finalAmount" } } },
    ]);

    const result = {
      totalBookings,
      totalSpent: totalSpent[0]?.total || 0,
      byStatus: {
        pending: 0,
        confirmed: 0,
        completed: 0,
        cancelled: 0,
      },
    };

    stats.forEach((stat) => {
      result.byStatus[stat._id] = stat.count;
    });

    res.json({
      success: true,
      data: { stats: result },
    });
  } catch (error) {
    console.error("Error getting booking stats:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê đặt lịch",
      error: error.message,
    });
  }
};
