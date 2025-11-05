import express from "express";
import {
  getStaffList,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  toggleStaffStatus,
} from "../../controllers/admin/staffController.js";

const router = express.Router();

// GET /api/admin/staff - Lấy danh sách nhân viên
router.get("/", getStaffList);

// GET /api/admin/staff/:id - Lấy chi tiết nhân viên
router.get("/:id", getStaffById);

// POST /api/admin/staff - Tạo nhân viên mới
router.post("/", createStaff);

// PUT /api/admin/staff/:id - Cập nhật nhân viên
router.put("/:id", updateStaff);

// DELETE /api/admin/staff/:id - Xóa nhân viên
router.delete("/:id", deleteStaff);

// PATCH /api/admin/staff/:id/toggle - Bật/tắt nhân viên
router.patch("/:id/toggle", toggleStaffStatus);

export default router;
