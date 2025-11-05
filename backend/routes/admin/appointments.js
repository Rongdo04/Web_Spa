import express from "express";
import {
  getAppointmentsList,
  getAppointmentsCalendar,
  getAppointmentById,
  getAppointmentByNumber,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  rescheduleAppointment,
  assignStaff,
  checkConflicts,
} from "../../controllers/admin/appointmentsController.js";

const router = express.Router();

// GET /api/admin/appointments - Lấy danh sách lịch hẹn
router.get("/", getAppointmentsList);

// GET /api/admin/appointments/calendar - Lấy dữ liệu calendar
router.get("/calendar", getAppointmentsCalendar);

// GET /api/admin/appointments/check-conflicts - Kiểm tra xung đột
router.get("/check-conflicts", checkConflicts);

// GET /api/admin/appointments/number/:appointmentNumber - Lấy chi tiết lịch hẹn bằng mã đặt lịch
router.get("/number/:appointmentNumber", getAppointmentByNumber);

// GET /api/admin/appointments/:id - Lấy chi tiết lịch hẹn
router.get("/:id", getAppointmentById);

// POST /api/admin/appointments - Tạo lịch hẹn mới
router.post("/", createAppointment);

// PUT /api/admin/appointments/:id - Cập nhật lịch hẹn
router.put("/:id", updateAppointment);

// DELETE /api/admin/appointments/:id - Xóa lịch hẹn
router.delete("/:id", deleteAppointment);

// PATCH /api/admin/appointments/:id/status - Cập nhật trạng thái lịch hẹn
router.patch("/:id/status", updateAppointmentStatus);

// PATCH /api/admin/appointments/:id/reschedule - Đổi lịch hẹn
router.patch("/:id/reschedule", rescheduleAppointment);

// PATCH /api/admin/appointments/:id/assign-staff - Gán nhân viên
router.patch("/:id/assign-staff", assignStaff);

export default router;
